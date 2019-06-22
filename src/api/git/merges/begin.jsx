import {exec} from '../exec'

export const begin = async (repositoryid, {
  branchid,
  origin,
  noFF = false
}, cxt) => {
  const stream = await exec(repositoryid, 'git merge ' + (
    noFF
    ? " --no-ff "
    : " ") + ' --no-commit ' + (
    origin
    ? "origin/"
    : "") + branchid, {}, cxt);

  return stream;
}
