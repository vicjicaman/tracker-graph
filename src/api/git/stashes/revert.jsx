import {exec} from '../exec'

export const revert = async (repositoryid, {
  stashid
}, cxt) => {
  const stream = await exec(repositoryid, "git stash show " + stashid + " -p | git apply --reverse ", {}, cxt);
}
