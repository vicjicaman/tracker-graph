import * as Branches from '../branches'
import {exec, lock} from '../exec'

export const merge = async (repositoryid, {
  sourceid,
  origin = false,
  message,
  theirs = false,
  noFF = false,
  destid
}, cxt) => { // git fetch origin foo:foo

  if (!destid || !sourceid) {
    throw new FlowError("INVALID_BRANCHID_MERGE");
  }

  await lock(repositoryid, async (lockedCxt) => {
    const currentBranch = await Branches.Query.current(repositoryid, {}, lockedCxt);

    let changed = false;
    if (destid !== currentBranch) {

      await Branches.checkout(repositoryid, {
        branchid: destid
      }, lockedCxt);
      changed = true;
    }

    try {
      await exec(repositoryid, 'git merge ' + (
        noFF
        ? " --no-ff "
        : " ") + (
        theirs
        ? " --strategy-option theirs "
        : "") + (
        message
        ? ' -m "' + message + '" '
        : "") + (
        origin
        ? "origin/"
        : "") + sourceid, {}, lockedCxt);
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
