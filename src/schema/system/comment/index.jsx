import _ from 'lodash'
import {schema as QueriesSchema, resolver as QueriesResolver} from './queries';
import {schema as MutationsSchema, resolver as MutationsResolver} from './mutations';

const schema = [
  ...QueriesSchema,
  ...MutationsSchema,
  `
  type Comment {
    id: String!
    commentid: String!
    author: String!
    comment: String!
    created: Date!
    entity: Entity!
  }

  `
];

const resolver = {
  ...QueriesResolver,
  ...MutationsResolver,
  Comment:{
    entity: e => e
  }
};

export {
  schema,
  resolver
};
