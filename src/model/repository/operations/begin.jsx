import * as OperationApi from 'Api/system/operation'
import * as GitSync from 'Api/git/sync'

export const begin = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, branchid} = repository;
    await GitSync.begin(repositoryid, {
      branchid,
      origin: true
    }, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
