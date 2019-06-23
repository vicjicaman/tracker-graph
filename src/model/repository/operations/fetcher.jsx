import * as OperationApi from 'Api/system/operation'
import * as GitSync from 'Api/git/sync'

export const fetcher = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {branchid} = repository;
    await GitSync.fetcher(repository.repositoryid, {
      branchid
    }, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
