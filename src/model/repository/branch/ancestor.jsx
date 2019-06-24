import _ from "lodash";
import * as GitApi from '@nebulario/tracker-git'
import {get} from './commit'

export const ancestor = async (branch, {}, cxt) => {
  const {branchid, baselineid, repository} = branch;
  const ancestor = await GitApi.Branches.Summary.ancestor(repository.repositoryid, {
    branchid,
    baselineid
  }, cxt);
  return {
    ...ancestor,
    head: get(branch, {
      commitid: ancestor.head
    }, cxt),
    current: get(branch, {
      commitid: ancestor.current
    }, cxt),
    common: get(branch, {
      commitid: ancestor.common
    }, cxt),
    branch
  };
}
