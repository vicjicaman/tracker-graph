import _ from "lodash";
import * as CommentApi from 'Api/namespace/system/comment';
import * as NamespaceObjectApi from 'Api/namespace/object'

export const list = async (parent, {}, cxt) => {
  const entities = await CommentApi.list(parent, {}, cxt);
  return _.map(entities, entity => NamespaceObjectApi.create(parent, entity, null, cxt));
}

export const get = async (parent, {
  commentid
}, cxt) => {
  const entity = await CommentApi.get(parent, {
    commentid
  }, cxt);
  return NamespaceObjectApi.create(parent, entity, null, cxt)
}
