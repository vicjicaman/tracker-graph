import {exec} from '../exec'

export const merge = async (repositoryid, {
  branchid,
  origin = false
}, cxt) => {
  await exec(repositoryid, 'git merge ' + (
    origin
    ? "origin/" + branchid
    : branchid), {}, cxt);
}
