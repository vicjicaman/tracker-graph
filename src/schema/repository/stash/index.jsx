import _ from 'lodash'
import {schema as QueriesSchema, resolver as QueriesResolver} from './queries';
import {schema as MutationsSchema, resolver as MutationsResolver} from './mutations';
import {schema as FileSchema, resolver as FileResolver} from './file';

import * as RepositoryStash from 'Model/repository/stash'

const schema = [
  ...QueriesSchema,
  ...MutationsSchema,
  ...FileSchema,
  `
    type Stash {
      id: String
      stashid: String
      groupid: String
      raw: String
      message: String
      branchid: String!
      files: StashFileQueries
    }
`
];

const resolver = {
  ...QueriesResolver,
  ...MutationsResolver,
  ...FileResolver,
  Stash: {
    files: stash => stash
  }
};

export {
  schema,
  resolver
};
