import * as OperationApi from '@nebulario/tracker-operation'
import * as GitApi from '@nebulario/tracker-git'
import {changes} from './utils'

export const merge = async (repository, {
  input,
  operation: {
    parent,
    mapper
  }
}, cxt) => {
  const {
    repositoryid,
    info: {
      merging,
      files
    },
    branchid
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

      const {status, files} = summary;
      if (status === "MERGE_INDIRECT" || status === "MERGE_DIRECT") {
        await GitApi.Merges.merge(repositoryid, {
          sourceid: branchid,
          destid: branchid,
          origin: true,
          noFF: input !== null,
          message: input
            ? input.subject + "\n" + input.message
            : null
        }, cxt);

        return await changes(repository, {}, cxt);
      }

    }

  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
