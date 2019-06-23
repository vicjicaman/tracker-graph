import * as OperationApi from 'Api/system/operation'
import * as GitSync from 'Api/git/sync'

export const push = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, branchid} = repository;

    try {
      await GitSync.push(repositoryid, {
        branchid
      }, cxt);
    } catch (e) {
      await GitSync.fetch(repositoryid, {
        branchid
      }, cxt);
    }

  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
