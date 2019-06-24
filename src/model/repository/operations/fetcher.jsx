import * as OperationApi from '@nebulario/tracker-operation'
import * as GitApi from '@nebulario/tracker-git'

export const fetcher = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {branchid} = repository;
    await GitApi.Sync.fetcher(repository.repositoryid, {
      branchid
    }, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
