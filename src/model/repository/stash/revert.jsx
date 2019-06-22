import * as GitStash from 'Api/git/stashes'

export const revert = async (stash, {}, cxt) => {

  const {stashid, repository: {
      repositoryid
    }} = stash;

  return await GitStash.revert(repositoryid, {
    stashid
  }, cxt);

}
