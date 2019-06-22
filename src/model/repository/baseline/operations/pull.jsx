import * as OperationApi from 'Api/system/operation'
import * as GitSync from 'Api/git/sync'

export const pull = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, baselineid} = repository;
    await GitSync.fetcher(repositoryid, {
      branchid: baselineid
    }, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
