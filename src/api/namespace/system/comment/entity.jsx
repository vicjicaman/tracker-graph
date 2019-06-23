import * as Entity from 'Api/utils/entity'
const uuidv4 = require('uuid/v4');

export const entity = "comment";

export const get = async (parent, {
  commentid
}, cxt) => {

  const config = {
    entity,
    transform: async (pre, {comment, author}) => {
      return ({comment, author});
    }
  };

  return await Entity.get(config, parent, {
    commentid
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
  comment,
  author
}, cxt) => {
  return await Entity.create(config, parent, {
    commentid: uuidv4(),
    comment,
    author
  }, cxt);
}

export const update = {
  /////////////////////////////////////////////////////////////////////////////
  comment: async (comm, {
    comment
  }, cxt) => {
    return await Entity.update(comm, async (content) => ({
      ...content,
      comment
    }), cxt);
  }
};

export const remove = async (comment, {}, cxt) => {
  return await Entity.remove(comment, {
    ignore: false
  }, cxt);
}
