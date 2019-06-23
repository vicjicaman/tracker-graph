import _ from 'lodash'
import path from 'path'
import * as Commit from '../../commits'
import * as Files from '../../files'
import * as BranchQuery from '../query'
import * as MergesQuery from '../../merges/query'

export const ancestor = async (repositoryid, {
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

  let status = "ANCESTOR_UP_TO_DATE";

  if (common !== head || common !== current) {
    if (common !== head && (common !== current)) {
      status = "ANCESTOR_OUT_OF_DATE";
    }

    if (common === current) {
      status = "MERGED_TO_ANCESTOR";
    }
  }

  return {
    status,
    common,
    head,
    current
  }

}
