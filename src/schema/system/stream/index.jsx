import _ from 'lodash'

import {schema as QueriesSchema, resolver as QueriesResolver} from './queries';
import {schema as MutationsSchema, resolver as MutationsResolver} from './mutations';

const schema = [
  ...QueriesSchema,
  ...MutationsSchema,
  `
  type StreamFrame {
      frameid: Int!
      data: String!
      type: String!
      label: String
      addedOn: Date!
  }

  type StreamConfig {
      size: Int!
  }

  type Stream {
      id: String!
      streamid: String!
      name: String
      type: String
      updatedOn: Date!
      config: StreamConfig
      frames: [StreamFrame]
      sequence: Int!
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
