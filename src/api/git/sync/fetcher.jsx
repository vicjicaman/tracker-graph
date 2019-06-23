import {exec} from '../exec'

export const fetcher = async (repositoryid, {
  branchid
}, cxt) => {

  //git fetch origin foo: foo
  await exec(repositoryid, 'git fetch origin ' + branchid + ":" + branchid, {}, cxt);
  //await exec(repositoryid, 'git pull origin ' + branchid, {}, cxt);
}
