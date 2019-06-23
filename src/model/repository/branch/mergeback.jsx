import _ from "lodash";
import * as GitBranchApi from 'Api/git/branches'
import {get} from './commit'

export const mergeback = async (branch, {}, cxt) => {
  const {branchid, baselineid, repository} = branch;
  const mergeback = await GitBranchApi.Summary.mergeback(repository.repositoryid, {
    branchid,
    baselineid
  }, cxt);
  return {
    ...mergeback,
    head: get(branch, {
      commitid: mergeback.head,
      baselineid
    }, cxt),
    current: get(branch, {
      commitid: mergeback.current
    }, cxt),
    common: get(branch, {
      commitid: mergeback.common,
      baselineid
    }, cxt),
    branch
  };
}
