import {exec} from '../exec'

export const drop = async (repositoryid, {
  stashid
}, cxt) => {
  const stream = await exec(repositoryid, "git stash drop " + stashid, {}, cxt);
}
