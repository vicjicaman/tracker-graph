import _ from "lodash";
import * as GitCommitFilesApi from 'Api/git/commits/files'
import * as Cache from 'Utils/cache'

export const prepare = (commit, {fileid, status, paths}) => ({
  id: commit.id + "_" + fileid,
  fileid,
  status,
  paths,
  commit
})

export const list = async (commit, {}, cxt) => {

  const {commitid, branch: {
      repository
    }} = commit;

  const res = await Cache.cache({
    keyid: "commit_" + commitid + "_files",
    hash: "forever"
  }, async function() {
    return await GitCommitFilesApi.list(repository.repositoryid, {
      commitid
    }, cxt);
  }, {}, cxt);

  return _.map(res, file => prepare(commit, file))
}

export const current = async (file, {}, cxt) => {

  const {
    paths: {
      relative: {
        file: fileid
      }
    },
    commit: {
      commitid,
      branch: {
        repository
      }
    }
  } = file;

  return await Cache.cache({
    keyid: "commit_" + commitid + "_file_current_" + fileid,
    hash: "forever"
  }, async function() {

    return await GitCommitFilesApi.revision(repository.repositoryid, {
      fileid,
      commitid
    }, cxt);

  }, {}, cxt);
}

export const previous = async (file, {}, cxt) => {

  const {
    paths: {
      relative: {
        file: fileid
      }
    },
    commit: {
      commitid,
      branch: {
        repository
      }
    }
  } = file;

  return await Cache.cache({
    keyid: "commit_" + commitid + "_file_previous_" + fileid,
    hash: "forever"
  }, async function() {

    return await GitCommitFilesApi.revision(repository.repositoryid, {
      fileid,
      commitid: commitid + "~1"
    }, cxt);

  }, {}, cxt);
}

export const filemeta = async (file, {}, cxt) => {

  const {
    commit: {
      branch: {
        repository
      }
    }
  } = file;

  if (!repository.filemeta) {
    return null;
  }
  return await repository.filemeta(repository, {
    file,
    current,
    previous
  }, cxt);

}
