import * as OperationApi from 'Api/system/operation'
import * as GitSync from 'Api/git/sync'
import * as GitFiles from 'Api/git/files'
import * as GitBranchApi from 'Api/git/branches'

export const reset = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, branchid} = repository;

    const {status} = await GitBranchApi.Summary.summary(repositoryid, {
      branchid
    }, cxt);

    if (status === "NEED_PUSH" || status === "DIVERGED") {
      await GitSync.reset(repositoryid, {}, cxt);
      await GitFiles.stage(repositoryid, {
        fileid: "."
      }, cxt);
    }

  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
