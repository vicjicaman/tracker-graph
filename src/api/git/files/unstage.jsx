import {exec} from '../exec'

export const unstage = async (repositoryid, {
  fileid
}, cxt) => {
  const stream = await exec(repositoryid, "git reset HEAD " + fileid, {}, cxt);
  if (stream.error) {
    throw new Error("UNSTAGE_ERROR")
  }
}
