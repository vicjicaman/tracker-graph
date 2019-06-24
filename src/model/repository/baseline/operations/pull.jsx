import * as OperationApi from '@nebulario/tracker-operation'
import * as GitApi from '@nebulario/tracker-git'

export const pull = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, baselineid} = repository;
    await GitApi.Sync.fetcher(repositoryid, {
      branchid: baselineid
    }, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
