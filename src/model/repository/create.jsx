import path from 'path';
import fs from 'fs';
import * as GitBranches from 'Api/git/branches'
import * as GitApi from 'Api/git'

export const create = async (repository, {
  commitid
}, cxt) => {
  const {repositoryid, branchid, baselineid, url} = repository;

  const exists = await GitApi.Query.exists(repositoryid, {}, cxt);
  if (!exists) {
    await GitApi.clone(repositoryid, {
      url
    }, cxt);
  }

  await GitBranches.create(repositoryid, {
    branchid,
    commitid
  }, cxt);

  if (baselineid) {
    await GitBranches.create(repositoryid, {
      branchid: baselineid
    }, cxt);
  }

  await GitBranches.checkout(repositoryid, {
    branchid
  }, cxt);

  return true;
}
