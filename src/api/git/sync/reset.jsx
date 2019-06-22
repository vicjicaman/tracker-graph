import {exec} from '../exec'

export const reset = async (repositoryid, {}, cxt) => {
  await exec(repositoryid, 'git reset HEAD^', {}, cxt);
}

// 'git push --set-upstream origin ' + branch
