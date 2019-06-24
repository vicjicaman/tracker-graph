import * as GitApi from '@nebulario/tracker-git'

export const changes = async (repository, {}, cxt) => {
  const {repositoryid, branchid} = repository;
  const commitid = await GitApi.Commits.current(repositoryid, {
    branchid
  }, cxt);

  const commit = await GitApi.Commits.get(repositoryid, {
    commitid
  }, cxt);

  const files = await GitApi.Commits.Files.list(repositoryid, {
    commitid
  }, cxt);

  const parents = [];

  for (const parentId of commit.parents) {
    const parentFiles = await GitApi.Commits.Files.list(repositoryid, {
      commitid: parentId
    }, cxt);

    parents.push(parentFiles);
  }

  return {files, parents};
}
