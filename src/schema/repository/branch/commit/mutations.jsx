import _ from 'lodash'

const schema = [`

  input CommitInput {
    subject: String!
    message: String!
  }

`];

const resolver = {

};

export {
  schema,
  resolver
};
