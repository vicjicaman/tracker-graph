import * as Entity from 'Api/utils/entity'

export const entity = "workspace";

export const get = async (root, args, cxt) => {

  const config = {
    entity,
    transform: async (pre, {url}) => {
      return ({url});
    }
  };

  return await Entity.get(config, root, args, cxt);
}

const config = {
  entity,
  get
};

export const list = async (root, args, cxt) => {
  return await Entity.list(config, root, args, cxt);
}

export const create = async (root, {
  workspaceid,
  url
}, cxt) => {
  return await Entity.create(config, root, {
    workspaceid,
    url
  }, cxt);
}

export const remove = async (workspace, {}, cxt) => {
  return await Entity.remove(workspace, {}, cxt);
}
