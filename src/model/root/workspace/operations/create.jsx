import * as OperationApi from '@nebulario/tracker-operation'
import * as WorkspaceApi from 'Api/root/workspace'
import * as RepositoryModel from 'Model/repository'
import {get as getWorkspace} from '../query'
import * as WorkspaceRepositoryModel from '../repository'

export const create = async (viewer, {
  workspaceid,
  url
}, cxt) => {

  const operation = async (cxt) => {
    const entity = await WorkspaceApi.create(cxt.root, {
      workspaceid,
      url
    }, cxt);

    const repo = WorkspaceRepositoryModel.repository(url, entity);
    await RepositoryModel.create(repo, {}, cxt);

    const ws =  await getWorkspace({}, {workspaceid}, cxt);
    const namespace = await WorkspaceRepositoryModel.get(ws, {}, cxt);
  };

  return await OperationApi.start(viewer, {}, operation, cxt);
}
