import {exec} from '../exec'

export const stage = async (repositoryid, {
  fileid
}, cxt) => {
  const stream = await exec(repositoryid, "git add " + fileid, {}, cxt);
  if (stream.error) {
    throw new Error("STAGE_ERROR")
  }
}
