import * as GitCommitApi from 'Api/git/commits'
import * as GitCommitFilesApi from 'Api/git/commits/files'

export const changes = async (repository, {}, cxt) => {
  const {repositoryid, branchid} = repository;
  const commitid = await GitCommitApi.current(repositoryid, {
    branchid
  }, cxt);

  const commit = await GitCommitApi.get(repositoryid, {
    commitid
  }, cxt);

  const files = await GitCommitFilesApi.list(repositoryid, {
    commitid
  }, cxt);

  const parents = [];

  for (const parentId of commit.parents) {
    const parentFiles = await GitCommitFilesApi.list(repositoryid, {
      commitid: parentId
    }, cxt);

    parents.push(parentFiles);
  }

  return {files, parents};
}
