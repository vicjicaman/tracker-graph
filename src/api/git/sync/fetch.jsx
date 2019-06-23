import {exec} from '../exec'
//import {wait} from '@nebulario/tracker-process';

export const fetch = async (repositoryid, {
  branchid
}, cxt) => {

  //await wait(1000);
  await exec(repositoryid, 'git fetch origin ' + branchid, {}, cxt);

}
