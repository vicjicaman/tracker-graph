import {exec} from '../exec'

export const abort = async (repositoryid, {}, cxt) => {
  await exec(repositoryid, 'git merge --abort', {}, cxt);
}
