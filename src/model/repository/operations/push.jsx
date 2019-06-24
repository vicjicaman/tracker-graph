import * as OperationApi from '@nebulario/tracker-operation'
import * as GitApi from '@nebulario/tracker-git'

export const push = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, branchid} = repository;

    try {
      await GitApi.Sync.push(repositoryid, {
        branchid
      }, cxt);
    } catch (e) {
      await GitApi.Sync.fetch(repositoryid, {
        branchid
      }, cxt);
    }

  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
