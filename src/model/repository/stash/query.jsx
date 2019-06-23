import _ from "lodash";
import * as GitStashApi from 'Api/git/stashes'

export const prepare = (repository, {stashid, message: raw}) => {

  let data = null;
  let branchid = null;
  try {
    const ss1 = raw.split("n ")[1];
    const [branch, payload] = raw.split(": ");
    branchid = branch;

    data = JSON.parse(payload);

  } catch (e) {
    data = {
      message: raw,
      groupid: null
    };
  }

  return {
    ...data,
    id: repository.id + "_" + stashid,
    stashid,
    branchid,
    raw,
    repository
  };
}

export const get = async (repository, {
  stashid
}, cxt) => {
  const {repositoryid} = repository;
  const res = await list(repository, {}, cxt);

  return _.find(res, {stashid}) || null;
}

export const list = async (repository, {}, cxt) => {
  const {repositoryid} = repository;

  const res = await GitStashApi.list(repositoryid, {}, cxt);
  return _.map(res, raw => prepare(repository, raw), cxt)
}
