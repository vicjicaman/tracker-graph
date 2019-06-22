import {exec} from '../exec'

export const validate = async ({}, {
  branchid
}, cxt) => {
  await exec(null, 'git check-ref-format --branch ' + branchid, {}, cxt);
}
