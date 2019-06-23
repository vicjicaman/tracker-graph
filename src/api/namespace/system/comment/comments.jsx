import * as Entity from 'Api/utils/entity'

export const attribute = "comments";

export const get = async (parent, cxt) => {
  return await Entity.attribute({
    attribute,
    transform: async (content) => {
      if (content === null) {
        return {comments: []};
      }
      return content;
    }
  }, parent, cxt);
}

export const update = async (parent, {
  comments
}, cxt) => {
  return await Entity.update({
    attribute,
    get
  }, parent, {
    comments
  }, cxt);
}
