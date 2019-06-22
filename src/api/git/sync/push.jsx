import {exec} from '../exec'
import * as GitBranchSummaryApi from '../branches/summary'

export const push = async (repositoryid, {
  branchid
}, cxt) => {

  const {status} = await GitBranchSummaryApi.summary(repositoryid, {
    branchid
  }, cxt);

  if (status === "NEED_PUSH") {
    await exec(repositoryid, 'git push --set-upstream origin ' + branchid, {}, cxt);
    return true;
  }
  return false;
}
