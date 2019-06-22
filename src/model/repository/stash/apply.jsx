import * as GitStash from 'Api/git/stashes'

export const apply = async (stash, {}, cxt) => {

  const {stashid, repository: {
      repositoryid
    }} = stash;

  return await GitStash.apply(repositoryid, {
    stashid
  }, cxt);

}
