import _ from "lodash";
import * as GitStashFilesApi from 'Api/git/stashes/files'

export const prepare = (stash, {fileid, status, paths}) => ({
  id: stash.id + "_" + fileid,
  fileid,
  status,
  paths,
  stash
})

export const list = async (stash, {}, cxt) => {

  const {stashid, repository: {
      repositoryid
    }} = stash;

  const res = await GitStashFilesApi.list(repositoryid, {
    stashid
  }, cxt);

  return _.map(res, file => prepare(stash, file))
}

export const diffs = async (stash, {}, cxt) => {

  const {stashid, repository: {
      repositoryid
    }} = stash;

  const res = await GitStashFilesApi.diffs(repositoryid, {
    stashid
  }, cxt);

  return _.map(res, file => prepare(stash, file))
}

export const content = async (file, {}, cxt) => {

  const {
    paths: {
      relative: {
        file: fileid
      }
    },
    stash: {
      stashid,
      repository,
      repository: {
        repositoryid
      }
    }
  } = file;

  return await GitStashFilesApi.content(repositoryid, {
    fileid,
    stashid
  }, cxt);
}
