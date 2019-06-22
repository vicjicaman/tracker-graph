import * as OperationApi from 'Api/system/operation'
import * as GitSync from 'Api/git/sync'

export const abort = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, branchid} = repository;
    await GitSync.abort(repositoryid, {}, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
