import * as OperationApi from '@nebulario/tracker-operation'
import * as GitApi from '@nebulario/tracker-git'

export const begin = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, branchid} = repository;
    await GitApi.Sync.begin(repositoryid, {
      branchid,
      origin: true
    }, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
