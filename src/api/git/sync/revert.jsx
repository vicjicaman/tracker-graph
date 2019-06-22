import * as Branches from '../branches'
import {exec, lock} from '../exec'

export const revert = async (repositoryid, {
  branchid,
  commitid
}, cxt) => {

  await lock(repositoryid, async (lockedCxt) => {
    const currentBranch = await Branches.Query.current(repositoryid, {}, lockedCxt);

    let changed = false;
    if (branchid !== currentBranch) {

      await Branches.checkout(repositoryid, {
        branchid
      }, lockedCxt);
      changed = true;
    }

    try {
      await exec(repositoryid, 'git reset --hard ' + commitid, {}, lockedCxt);
    } catch (e) {
      throw e;
    } finally {
      if (changed) {
        await Branches.checkout(repositoryid, {
          branchid: currentBranch
        }, lockedCxt);
      }
      return false;
    }

    return true;
  }, cxt);

}
