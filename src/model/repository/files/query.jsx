import _ from "lodash";
import * as GitApi from '@nebulario/tracker-git'
import fs from 'fs'

const prepare = (repository, file) => ({
  ...file,
  repository
})

export const list = async (repository, {}, cxt) => {
  return _.map(repository.info.files, file => prepare(repository, file));
}

export const current = async ({
  staged,
  unstaged,
  paths: {
    absolute: {
      file
    }
  }
}, {}, cxt) => {

  if (!fs.existsSync(file) || (staged === "?" && unstaged === "?")) {
    return null;
  }

  return fs.readFileSync(file);
}

export const previous = async (file, {}, cxt) => {

  const {
    paths: {
      relative: {
        file: fileid
      }
    },
    repository,
    repository: {
      branchid
    }
  } = file;

  return await GitApi.Commits.Files.revision(repository.repositoryid, {
    fileid,
    branchid,
    commitid: "HEAD"
  }, cxt);
}

export const filemeta = async (file, {}, cxt) => {
  const {repository} = file;

  if (!repository.filemeta) {
    return null;
  }
  return await repository.filemeta(repository, {
    file,
    current,
    previous
  }, cxt);

}
