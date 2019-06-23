import * as Entity from 'Api/utils/entity'

export const entity = "label";

export const get = async (parent, {
  labelid
}, cxt) => {

  const config = {
    entity,
    transform: async (pre, {type}) => {
      return ({type});
    }
  };

  return await Entity.get(config, parent, {
    labelid
  }, cxt);
}

const config = {
  entity,
  get
};

export const list = async (parent, args, cxt) => {
  return await Entity.list(config, parent, args, cxt);
}

export const create = async (parent, {
  labelid,
  type
}, cxt) => {

  return await Entity.create(config, parent, {
    labelid,
    type
  }, cxt);
}

export const remove = async (label, {}, cxt) => {
  return await Entity.remove(label, {
    ignore: false
  }, cxt);
}
