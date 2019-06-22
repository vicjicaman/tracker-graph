import {exec} from '../exec'

export const apply = async (repositoryid, {
  stashid
}, cxt) => {
  const stream = await exec(repositoryid, "git stash apply " + stashid, {}, cxt);
  if (stream.error) {
    throw new Error("STASH_APPLY_ERROR")
  }
}
