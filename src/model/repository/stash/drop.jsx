import * as GitApi from '@nebulario/tracker-git'

export const drop = async (stash, {}, cxt) => {

  const {stashid, repository: {
      repositoryid
    }} = stash;

  return await GitApi.Stash.drop(repositoryid, {
    stashid
  }, cxt);

}
