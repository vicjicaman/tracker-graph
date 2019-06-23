import {exec} from '../exec'
import * as MergesApi from '../merges'

export const begin = async (repositoryid, {
  branchid,
  origin
}, cxt) => {

  try {
    const stream = await MergesApi.begin(repositoryid, {
      branchid,
      origin
    }, cxt);
  } catch (e) {
    console.log(e.toString())
  }

  //git merge   --no-commit origin/runtime-rebuild/master
  //await exec(repositoryid, 'git pull origin ' + branchid, {}, cxt);
}
