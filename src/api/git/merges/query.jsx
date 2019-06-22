import * as Branches from '../branches'
import * as Sync from '../sync'
import * as Files from '../files'
import {lock} from '../exec'
import {begin} from './begin'
import {abort} from './abort'

export const haveUnmerged = (files) => {

  if (files === null) {
    return false;
  }

  for (const file of files) {
    if (file.staged === "U" || file.unstaged === "U") {
      return true;
    }
  }
  return false;
}

export const list = async (repositoryid, {
  baselineid,
  branchid,
  origin = true
}, cxt) => {

  const destBranchId = baselineid;
  const srcBranchId = (
    origin
    ? "origin/"
    : "") + branchid;

  return await lock(repositoryid, async (lockedCxt) => {
    let merge = [];
    const currentBranch = await Branches.Query.current(repositoryid, {}, lockedCxt);

    try {

      const changes = await Files.list(repositoryid, {
        nocache: true
      }, lockedCxt);

      if (changes.length > 0) {
        return merge;
      }

      /*
    git checkout mybranch
    git checkout -b mynew-temporary-branch
    git merge some-other-branch
    */
      const helperBranchId = "repoflow/" + destBranchId;

      /*onsole.log("MEREGE LIST FOR ")
    //console.log(" FROM: " + srcBranchId + " to   " + destBranchId);
    //console.log(" CURRENT: " + currentBranch + " HELPER   " + helperBranchId);
*/
      const localHelper = await Branches.Query.isLocal(repositoryid, {
        branchid: helperBranchId
      }, lockedCxt);

      if (!localHelper) {

        if (destBranchId !== currentBranch) {
          await Branches.checkout(repositoryid, {
            branchid: destBranchId
          }, lockedCxt);
        }

        await Branches.branch(repositoryid, {
          branchid: helperBranchId
        }, lockedCxt);

        await Branches.checkout(repositoryid, {
          branchid: helperBranchId
        }, lockedCxt);
      } else {
        await Branches.checkout(repositoryid, {
          branchid: helperBranchId
        }, lockedCxt);

        await Sync.merge(repositoryid, {
          branchid: destBranchId
        }, lockedCxt);
      }

      try {
        await begin(repositoryid, {
          branchid: srcBranchId,
          noFF: true
        }, lockedCxt);

      } catch (e) {
        //console.log("MERGE_BEGIN_LIST_ISSUE:" + repositoryid);
        //console.log(e.toString());
      }

      merge = await Files.list(repositoryid, {
        nocache: true
      }, lockedCxt);

      try {
        await abort(repositoryid, {}, lockedCxt);
      } catch (e) {
        //console.log("MERGE_ABORT_LIST_ISSUE:" + repositoryid);
        //console.log(e.toString());
      }

    } catch (e) {
      console.log("MERGE_HELPER_ERROR:" + e.toString())
      throw e;
    } finally {

      await Branches.checkout(repositoryid, {
        branchid: currentBranch
      }, lockedCxt);

    }

    return merge;
  }, cxt);

}
