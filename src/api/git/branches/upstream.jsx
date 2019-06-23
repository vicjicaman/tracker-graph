import {exec} from '../exec'

export const upstream = async (repositoryid, {
  branchid
}, cxt) => {
  await exec(repositoryid, "git branch --set-upstream-to=origin/" + branchid + " " + branchid, {}, cxt);
}
