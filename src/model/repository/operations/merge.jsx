import * as OperationApi from 'Api/system/operation'
import * as GitSync from 'Api/git/sync'
import * as GitMergesApi from 'Api/git/merges'
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

    const summary = await GitMergesApi.summary(repositoryid, {
      merging,
      changes: files,
      branchid,
      baselineid: branchid,
      origin: true
    }, cxt);

    if (summary) {

      const {status, files} = summary;
      if (status === "MERGE_INDIRECT" || status === "MERGE_DIRECT") {
        await GitMergesApi.merge(repositoryid, {
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
