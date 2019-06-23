import _ from 'lodash'
import * as Query from './query'

export const summary = async (repositoryid, {
  merging,
  changes,
  baselineid,
  branchid,
  origin = true
}, cxt) => {
  let status = "";
  let files = null;

  if (merging !== null) {
    status = "MERGING";
  }

  if (changes.length > 0) {
    status = "CHANGES";
  }

  if (status === "") {

    files = await Query.list(repositoryid, {
      baselineid,
      branchid,
      origin: true
    }, cxt);

    if (files === null) {
      status = "MERGED";
    } else {
      if (files.length === 0) {
        status = "MERGE_DIRECT";
      } else {
        status = "MERGE_INDIRECT";
      }

      if (Query.haveUnmerged(files)) {
        status = "MERGE_CONFLICT";
      }
    }
  }

  return {status, files}

}
