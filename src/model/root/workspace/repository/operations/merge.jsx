import * as OperationApi from '@nebulario/tracker-operation'
import * as GitApi from '@nebulario/tracker-git'
import {
  changes
} from 'Model/repository/operations/utils'
import * as WorkspaceModel from 'Model/root/workspace'

export const merge = async (repository, {}, cxt) => {
  const {
    repositoryid,
    info: {
      merging,
      files
    },
    branchid,
    workspace
  } = repository;

  const operation = async (cxt) => {

    const summary = await GitApi.Merges.summary(repositoryid, {
      merging,
      changes: files,
      branchid,
      baselineid: branchid,
      origin: true
    }, cxt);

    if (summary) {
      const {
        status,
        files
      } = summary;

      if (status === "MERGE_INDIRECT" || status === "MERGE_DIRECT") {
        await GitApi.Merges.merge(repositoryid, {
          sourceid: branchid,
          destid: branchid,
          origin: true,
          message: "-"
        }, cxt);
      }

      if (status === "MERGE_CONFLICT") {
        await GitApi.Merges.merge(repositoryid, {
          sourceid: branchid,
          destid: branchid,
          origin: true,
          message: "-",
          theirs: true // USING THERIS TO RESOLVE MERGE_CONFLICT
        }, cxt);
      }

      return await changes(repository, {}, cxt);
    }

  };

  return await OperationApi.start(workspace, {
    mapper: WorkspaceModel.Mapper.operation
  }, operation, cxt);
}
