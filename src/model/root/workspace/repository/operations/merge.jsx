import * as OperationApi from 'Api/system/operation'
import * as GitMergesApi from 'Api/git/merges'
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

    const summary = await GitMergesApi.summary(repositoryid, {
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
        await GitMergesApi.merge(repositoryid, {
          sourceid: branchid,
          destid: branchid,
          origin: true,
          message: "-"
        }, cxt);
      }

      if (status === "MERGE_CONFLICT") {
        await GitMergesApi.merge(repositoryid, {
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
