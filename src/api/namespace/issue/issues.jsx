import * as Entity from 'Api/utils/entity'

export const attribute = "issues";

export const get = async (parent, cxt) => {
  return await Entity.attribute({
    attribute,
    transform: async (content) => {
      if (content === null) {
        return {issues: []};
      }
      return content;
    }
  }, parent, cxt);
}

export const update = async (parent, {
  issues
}, cxt) => {
  return await Entity.update({
    attribute,
    get
  }, parent, {
    issues
  }, cxt);
}
