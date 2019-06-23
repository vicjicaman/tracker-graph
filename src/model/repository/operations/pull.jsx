import * as OperationApi from 'Api/system/operation'
import * as GitSync from 'Api/git/sync'

export const pull = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {branchid} = repository;
    await GitSync.pull(repository.repositoryid, {
      branchid
    }, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
