import {exec} from '../exec'

export const checkout = async (repositoryid, {
  fileid,
  commitid
}, cxt) => {
  const stream = await exec(repositoryid, "git checkout " + commitid + " -- " + fileid, {}, cxt);
  if (stream.error) {
    throw new Error("FILE_CHECKOUT_ERROR")
  }
}
