import _ from "lodash";
import * as WorkspaceApi from 'Api/root/workspace'
import * as ObjectApi from 'Api/utils/object'

export const get = async ({}, {
  workspaceid
}, cxt) => {
  const entity = await WorkspaceApi.get(cxt.root, {
    workspaceid
  }, cxt);

  return ObjectApi.create(cxt.root, entity, null, cxt);
}

export const list = async ({}, {}, cxt) => {
  const entities = await WorkspaceApi.list(cxt.root, {}, cxt);
  return _.map(entities, entity => ObjectApi.create(cxt.root, entity, null, cxt))

}
