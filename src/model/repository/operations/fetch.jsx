import * as OperationApi from 'Api/system/operation'
import * as GitSync from 'Api/git/sync'
import * as GitCommitApi from 'Api/git/commits'
import * as GitCommitFilesApi from 'Api/git/commits/files'

export const fetch = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, branchid} = repository;

    /*const previousid = await GitCommitApi.current(repositoryid, {
      branchid
    }, cxt);*/

    await GitSync.fetch(repositoryid, {
      branchid
    }, cxt);
/*
    const res = await GitCommitFilesApi.list(repositoryid, {
      commitid: previousid
    }, cxt);
*/
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
