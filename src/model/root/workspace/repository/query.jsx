import path from 'path'
import * as RepositoryModel from 'Model/repository'
import * as NamespaceFileModel from 'Model/namespace/file'

export const repository = (url, {
  paths: {
    absolute: {
      folder
    }
  }
}) => ({
  repositoryid: path.join(folder, "repository"),
  url,
  branchid: "master",
  baselineid: null
})

export const get = async (workspace, {}, cxt) => {

  const {url} = workspace;
  const repo = await RepositoryModel.get(repository(url, workspace.entity), {}, cxt);

  if (!repo.exists) {
    return null;
  }

  repo.workspace = workspace;
  repo.filemeta = NamespaceFileModel.filemeta;
  return repo;
}
