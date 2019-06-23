import _ from 'lodash'
import {schema as QueriesSchema, resolver as QueriesResolver} from './queries';
import {schema as MutationsSchema, resolver as MutationsResolver} from './mutations';

const schema = [
  ...QueriesSchema,
  ...MutationsSchema,
  `
  type Label {
    id: String!
    labelid: String!
    type: String!
    entity: Entity!
  }

  `
];

const resolver = {
  ...QueriesResolver,
  ...MutationsResolver,
  Label: {
    entity: e => e
  }
};

export {
  schema,
  resolver
};
