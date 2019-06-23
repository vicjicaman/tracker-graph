import _ from "lodash";
import * as NamespaceIssueApi from 'Api/namespace/issue'
import * as NamespaceObjectApi from 'Api/namespace/object'

export const get = async (namespace, {
  issueid
}, cxt) => {

  const entity = await NamespaceIssueApi.get(namespace, {
    issueid
  }, cxt);

  return NamespaceObjectApi.create(namespace, entity, null, cxt)
}

export const list = async (namespace, {}, cxt) => {
  const entities = await NamespaceIssueApi.list(namespace, {}, cxt);
  return _.map(entities, entity => NamespaceObjectApi.create(namespace, entity, null, cxt));
}
