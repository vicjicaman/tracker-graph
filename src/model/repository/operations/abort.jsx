import * as OperationApi from '@nebulario/tracker-operation'
import * as GitApi from '@nebulario/tracker-git'

export const abort = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, branchid} = repository;
    await GitApi.Sync.abort(repositoryid, {}, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
