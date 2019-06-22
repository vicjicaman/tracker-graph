import _ from 'lodash'

import {schema as QueriesSchema, resolver as QueriesResolver} from './queries';
import {schema as MutationsSchema, resolver as MutationsResolver} from './mutations';

const schema = [
  ...QueriesSchema,
  ...MutationsSchema,
  `

  type Execution {
    stream: Stream!
    operations: [Operation]!
  }

  `
];

const resolver = {
  ...QueriesResolver,
  ...MutationsResolver
};

export {
  schema,
  resolver
};
