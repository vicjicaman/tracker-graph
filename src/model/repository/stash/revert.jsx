import * as GitApi from '@nebulario/tracker-git'

export const revert = async (stash, {}, cxt) => {

  const {stashid, repository: {
      repositoryid
    }} = stash;

  return await GitApi.Stash.revert(repositoryid, {
    stashid
  }, cxt);

}
