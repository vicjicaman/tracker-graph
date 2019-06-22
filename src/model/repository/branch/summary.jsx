import _ from "lodash";
import * as GitBranchApi from 'Api/git/branches'
import {get} from './commit'

export const summary = async (branch, {}, cxt) => {
  const {branchid, baselineid, repository} = branch;
  const summary = await GitBranchApi.Summary.summary(repository.repositoryid, {
    branchid
  }, cxt);

  return {
    ...summary,
    base: get(branch, {
      commitid: summary.base
    }, cxt),
    current: get(branch, {
      commitid: summary.local
    }, cxt),
    remote: get(branch, {
      commitid: summary.remote
    }, cxt),
    branch
  };
}
