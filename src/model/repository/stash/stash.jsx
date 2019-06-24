import * as GitApi from '@nebulario/tracker-git'

export const stash = async (repository, {
  groupid,
  message
}, cxt) => {
  const {repositoryid} = repository;

  const payload = {
    groupid,
    message
  };

  await GitApi.Stash.stash(repositoryid, {
    message: JSON.stringify(payload).replace(/"/g, '\\"')
  }, cxt);
}
