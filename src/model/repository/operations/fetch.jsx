import * as OperationApi from '@nebulario/tracker-operation'
import * as GitApi from '@nebulario/tracker-git'

export const fetch = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, branchid} = repository;

    /*const previousid = await GitApi.Commits.current(repositoryid, {
      branchid
    }, cxt);*/

    await GitApi.Sync.fetch(repositoryid, {
      branchid
    }, cxt);
/*
    const res = await GitApi.Commits.Files.list(repositoryid, {
      commitid: previousid
    }, cxt);
*/
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
