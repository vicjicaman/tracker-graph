import _ from "lodash";
import * as GitApi from '@nebulario/tracker-git'

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

  const res = await GitApi.Stash.Files.list(repositoryid, {
    stashid
  }, cxt);

  return _.map(res, file => prepare(stash, file))
}

export const diffs = async (stash, {}, cxt) => {

  const {stashid, repository: {
      repositoryid
    }} = stash;

  const res = await GitApi.Stash.Files.diffs(repositoryid, {
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

  return await GitApi.Stash.Files.content(repositoryid, {
    fileid,
    stashid
  }, cxt);
}
