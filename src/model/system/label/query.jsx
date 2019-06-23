import _ from "lodash";
import * as LabelApi from 'Api/namespace/system/label';
import * as NamespaceObjectApi from 'Api/namespace/object'

export const list = async (parent, {}, cxt) => {
  const entities = await LabelApi.list(parent, {}, cxt);
  return _.map(entities, entity => NamespaceObjectApi.create(parent, entity, null, cxt));
}

export const get = async (parent, {
  labelid
}, cxt) => {
  const entity = await LabelApi.get(parent, {
    labelid
  }, cxt);
  return NamespaceObjectApi.create(parent, entity, null, cxt)
}
