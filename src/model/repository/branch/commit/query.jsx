import _ from "lodash";
import * as GitCommitApi from 'Api/git/commits'
import * as Cache from 'Utils/cache'

/*
export const prepare = (branch, commit) => commit
  ? ()
  : null*/

export const get = async (branch, {
  commitid,
  baselineid
}, cxt) => {

  const {branchid, repository: {
      repositoryid
    }} = branch;

  const raw = await Cache.cache({
    keyid: "commit_" + commitid,
    hash: "forever"
  }, async function() {
    return await GitCommitApi.get(repositoryid, {
      commitid
    }, cxt);
  }, {}, cxt);

  if (!raw) {
    return null;
  }

  const branches = await GitCommitApi.branches(repositoryid, {
    commitid
  }, cxt);

  return {
    id: branch.id + "_" + raw.commitid,
    ...raw,
    type: raw.parents.length > 1
      ? "merge"
      : "commit",
    remote: branches.includes("origin/" + (
      baselineid
      ? baselineid
      : branchid)),
    branch
  }; //prepare(branch, raw);
}

export const list = async (branch, {}, cxt) => {

  const {branchid, baselineid, repository} = branch;
  const {baseid} = repository;

  const res = await GitCommitApi.list(repository.repositoryid, {
    branchid,
    baselineid,
    commitid: baseid
  }, cxt);

  return _.map(res, commitid => get(branch, {
    commitid
  }, cxt))
}

export const parents = async (commit, {}, cxt) => {

  const {
    branch,
    branch: {
      branchid,
      baselineid,
      repository: {
        repositoryid
      }
    },
    commitid,
    parents: ParentIds
  } = commit;

  const res = [];

  for (const parentid of ParentIds) {
    const commitObj = await get(branch, {
      commitid: parentid
    }, cxt);

    if (!commitObj) {
      return null;
    }

    res.push(commitObj);
  }

  return res;

}
