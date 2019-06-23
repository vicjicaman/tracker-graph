import * as GitStash from 'Api/git/stashes'

export const stash = async (repository, {
  groupid,
  message
}, cxt) => {
  const {repositoryid} = repository;

  const payload = {
    groupid,
    message
  };

  await GitStash.stash(repositoryid, {
    message: JSON.stringify(payload).replace(/"/g, '\\"')
  }, cxt);
}
