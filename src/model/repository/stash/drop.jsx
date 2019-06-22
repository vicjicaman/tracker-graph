import * as GitStash from 'Api/git/stashes'

export const drop = async (stash, {}, cxt) => {

  const {stashid, repository: {
      repositoryid
    }} = stash;

  return await GitStash.drop(repositoryid, {
    stashid
  }, cxt);

}
