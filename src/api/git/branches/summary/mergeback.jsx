import _ from 'lodash'
import * as Commit from '../../commits'
import * as Branches from '../../branches'
import * as Files from '../../files'

export const mergeback = async (repositoryid, {
  baselineid,
  branchid
}, cxt) => {

  const current = await Commit.current(repositoryid, {
    branchid
  }, cxt);

  const head = await Commit.current(repositoryid, {
    branchid: baselineid
  }, cxt);

  const common = await Commit.common(repositoryid, {
    baselineid,
    branchid
  }, cxt);

  let status = "MERGED";

  let merge = [];
  if (common !== current) {
    status = "PENDING";
  }

  if (current === null) {
    status = "NO_LOCAL";
  }

  return {
    status, common, head, current
    /*common: await Commit.get(repositoryid, {
      commitid: common
    }, cxt),
    head: await Commit.get(repositoryid, {
      commitid: head
    }, cxt),
    current: await Commit.get(repositoryid, {
      commitid: current
    }, cxt)*/
  }

}
