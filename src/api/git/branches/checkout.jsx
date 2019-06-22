import {exec} from '../exec'

export const checkout = async (repositoryid, {
  branchid
}, cxt) => {
  await exec(repositoryid, 'git checkout ' + branchid, {}, cxt);
}
