import _ from 'lodash'
import * as Commit from '../../commits'
import * as Files from '../../files'
import * as BranchQuery from '../query'

export const summary = async (repositoryid, {
  branchid
}, cxt) => {

  const local = await Commit.current(repositoryid, {
    branchid
  }, cxt);

  const base = await Commit.base(repositoryid, {
    branchid
  }, cxt);

  const remote = await Commit.remote(repositoryid, {
    branchid
  }, cxt);

  let status = "DIVERGED";

  if (local === remote) {
    if (local === null) {
      status = "NO_LOCAL"
    } else {
      status = "UP_TO_DATE"
    }

  } else if (local === base) {
    status = "NEED_PULL"
  } else if (remote === base) {
    status = "NEED_PUSH"
  }

  return {
    status, local, base, remote
    /*
    current: await Commit.get(repositoryid, {
      commitid: local
    }, cxt),
    base: await Commit.get(repositoryid, {
      commitid: base
    }, cxt),
    remote: await Commit.get(repositoryid, {
      commitid: remote
    }, cxt)*/
  }

}
