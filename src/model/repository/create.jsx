import path from 'path';
import fs from 'fs';
import * as GitApi from '@nebulario/tracker-git'

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

  await GitApi.Branches.create(repositoryid, {
    branchid,
    commitid
  }, cxt);

  if (baselineid) {
    await GitApi.Branches.create(repositoryid, {
      branchid: baselineid
    }, cxt);
  }

  await GitApi.Branches.checkout(repositoryid, {
    branchid
  }, cxt);

  return true;
}
