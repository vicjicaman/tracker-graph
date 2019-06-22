import {exec} from '../exec'

export const stash = async (repositoryid, {
  message
}, cxt) => {
  const stream = await exec(repositoryid, "git stash save \"" + message + "\"", {}, cxt);
  if (stream.error) {
    throw new Error("STASH_ERROR")
  }
}
