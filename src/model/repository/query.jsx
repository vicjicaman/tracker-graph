import _ from "lodash";
import * as GitApi from 'Api/git'
import * as GitCommitApi from 'Api/git/commits'
import * as GitBranchApi from 'Api/git/branches'
import * as GitFilesApi from 'Api/git/files'
import fs from 'fs'
import {getRootPaths} from 'Api/utils/path'

export const get = async (repo, {}, cxt) => {

  const {repositoryid, url, branchid, baselineid, baseid} = repo;

  const exists = await GitApi.Query.exists(repositoryid, {}, cxt);

  let status = "ready";
  const info = {};

  if (!exists) {
    status = "repository:" + repositoryid.replace(cxt.workspace, "")
  } else {
    info.branchid = await GitBranchApi.Query.current(repositoryid, {}, cxt);
    info.url = await GitApi.Query.url(repositoryid, {}, cxt);
    info.merging = GitApi.Query.merging(repositoryid, {}, cxt);
    info.files = await GitFilesApi.list(repositoryid, {}, cxt);

    if (info.branchid !== branchid) {
      status = "branch:" + info.branchid;
    }

    if (info.url !== url) {
      status = "url:" + info.url;
    }
  }

  //console.log(repositoryid)
  //console.log(status);
  return {
    id: repositoryid + "_repository",
    repositoryid,
    status,
    url,
    branchid,
    baselineid,
    baseid,
    exists,
    info,
    paths: getRootPaths(repositoryid)
  }
}
