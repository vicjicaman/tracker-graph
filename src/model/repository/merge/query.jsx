import * as GitCommitApi from 'Api/git/commits'
import _ from "lodash";
import * as GitMergesApi from 'Api/git/merges'

export const get = async (repository, {}, cxt) => {

  return repository.info.merging
    ? await GitCommitApi.get(repository.repositoryid, {
      commitid: repository.info.merging
    }, cxt)
    : null

}

export const summary = async (branch, {
  branchid,
  baselineid
}, cxt) => {
  const {
    repository: {
      repositoryid,
      info: {
        merging,
        files
      }
    }
  } = branch;

  const summary = await GitMergesApi.summary(repositoryid, {
    merging,
    changes: files,
    branchid,
    baselineid,
    origin: branchid === baselineid
  }, cxt);

  return summary;
}
