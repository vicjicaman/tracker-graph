import {exec} from '../exec'
import * as Query from '../query'
import * as GitFilesApi from '../files'

export const commit = async (repositoryid, {
  message
}, cxt) => {

  const list = await GitFilesApi.list(repositoryid, {}, cxt);
  const merging = await Query.merging(repositoryid, {}, cxt);
  const staged = GitFilesApi.checkFiles(list, GitFilesApi.isFileStaged);
  const unmerged = GitFilesApi.checkFiles(list, GitFilesApi.isFileUnmerge);

  if (staged || (merging && !unmerged)) {
    const stream = await exec(repositoryid, "git commit -m \"" + message + "\"", {}, cxt);
    if (stream.error) {
      throw new Error("COMMIT_ERROR")
    }
    return true;
  }
  return false;
}
