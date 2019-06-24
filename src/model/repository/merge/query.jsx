import * as GitApi from '@nebulario/tracker-git'
import _ from "lodash";

export const get = async (repository, {}, cxt) => {

  return repository.info.merging
    ? await GitApi.Commits.get(repository.repositoryid, {
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

  const summary = await GitApi.Merges.summary(repositoryid, {
    merging,
    changes: files,
    branchid,
    baselineid,
    origin: branchid === baselineid
  }, cxt);

  return summary;
}
