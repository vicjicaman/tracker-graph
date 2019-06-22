import _ from 'lodash'
import {schema as QueriesSchema, resolver as QueriesResolver} from './queries';
import {schema as MutationsSchema, resolver as MutationsResolver} from './mutations';

const schema = [
  ...QueriesSchema,
  ...MutationsSchema,
  `

    type MergeSummary {
      status: String!
      files: [File]
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
