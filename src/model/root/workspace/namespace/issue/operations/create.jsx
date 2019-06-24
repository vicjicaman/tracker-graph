import * as OperationApi from '@nebulario/tracker-operation'
import * as IssueApi from 'Api/namespace/issue'
import * as Git from '@nebulario/tracker-git'
import * as GitApi from '@nebulario/tracker-git'
import * as WorkspaceModel from 'Model/root/workspace'

export const create = async (namespace, {
  input
}, cxt) => {

  const {repositoryid, workspace} = namespace;
  const operation = async (cxt) => {

    const author = await Git.Query.user(repositoryid, {}, cxt);
    const issue = await IssueApi.create(namespace, {
      author,
      ...input
    }, cxt);

    const {
      paths: {
        relative: {
          file: fileid
        }
      }
    } = issue;

    await GitApi.Files.stage(repositoryid, {
      fileid
    }, cxt);

  };

  return await OperationApi.start(workspace, {
    mapper: WorkspaceModel.Mapper.operation
  }, operation, cxt);
}
