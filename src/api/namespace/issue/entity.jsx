import * as Entity from 'Api/utils/entity'
const uuidv4 = require('uuid/v4');

export const entity = "issue";

export const get = async (repository, {
  issueid
}, cxt) => {

  const config = {
    entity,
    transform: async (pre, {subject, description, author}) => {
      return ({subject, description, author});
    }
  };

  const issue = await Entity.get(config, repository, {
    issueid
  }, cxt);

  return issue;
}

const config = {
  entity,
  get
};

export const list = async (repository, args, cxt) => {
  return await Entity.list(config, repository, args, cxt);
}
export const create = async (repository, {
  subject,
  description,
  author
}, cxt) => {
  return await Entity.create(config, repository, {
    issueid: uuidv4(),
    subject,
    description,
    author
  }, cxt);
}

export const update = {
  /////////////////////////////////////////////////////////////////////////////
  general: async (issue, {
    subject,
    description
  }, cxt) => {
    return await Entity.update(issue, async (content) => ({
      ...content,
      subject,
      description
    }), cxt);
  }
};

export const remove = async (issue, {
  ignore
}, cxt) => {
  return await Entity.remove(issue, {
    ignore
  }, cxt);
}
