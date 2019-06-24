import * as GitApi from '@nebulario/tracker-git'

export const apply = async (stash, {}, cxt) => {

  const {stashid, repository: {
      repositoryid
    }} = stash;

  return await GitApi.Stash.apply(repositoryid, {
    stashid
  }, cxt);

}
