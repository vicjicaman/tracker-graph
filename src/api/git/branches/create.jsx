import {exec} from '../exec'
import * as Query from './query';

export const branch = async (repositoryid, {
  branchid
}, cxt) => {
  await exec(repositoryid, "git branch " + branchid, {}, cxt);
}

export const create = async (repositoryid, {
  branchid,
  commitid
}, cxt) => {

  const tracking = await Query.isTracking(repositoryid, {
    branchid
  }, cxt);

  const local = await Query.isLocal(repositoryid, {
    branchid
  }, cxt);

  const remote = await Query.isRemote(repositoryid, {
    branchid
  }, cxt);

  if (!local && !remote) {
    await exec(repositoryid, "git branch " + branchid + (
      commitid
      ? " " + commitid
      : ""), {}, cxt);
  }

  if (!local && remote) {
    await exec(repositoryid, "git checkout --track origin/" + branchid, {}, cxt);
  }

}
