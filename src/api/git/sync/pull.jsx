import {exec} from '../exec'

export const pull = async (repositoryid, {
  branchid
}, cxt) => {

  await exec(repositoryid, 'git pull origin ' + branchid, {}, cxt);
}
