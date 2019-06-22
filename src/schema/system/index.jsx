import _ from 'lodash'
import {schema as QueriesSchema, resolver as QueriesResolver} from './queries';
import {schema as MutationsSchema, resolver as MutationsResolver} from './mutations';
import {schema as OperationSchema, resolver as OperationResolver} from './operation';
import {schema as StreamSchema, resolver as StreamResolver} from './stream';
import {schema as ExeSchema, resolver as ExeResolver} from './execution';
import {schema as LabelSchema, resolver as LabelResolver} from './label';
import {schema as EntitySchema, resolver as EntityResolver} from './entity';
import {schema as CommentSchema, resolver as CommentResolver} from './comment';

import * as PingModel from 'Model/system/ping'

const schema = [
  ...LabelSchema,
  ...ExeSchema,
  ...OperationSchema,
  ...StreamSchema,
  ...QueriesSchema,
  ...MutationsSchema,
  ...EntitySchema,
  ...CommentSchema,
  `
    type System {
      operations: OperationQueries
      streams: StreamQueries
      ping (type: String!, params: JSON!) : String
    }
`
];

const resolver = {
  ...LabelResolver,
  ...ExeResolver,
  ...OperationResolver,
  ...StreamResolver,
  ...QueriesResolver,
  ...MutationsResolver,
  ...EntityResolver,
  ...CommentResolver,
  System: {
    operations: (system) => system,
    streams: (system) => system,
    ping: async (parent, {
      type,
      params
    }, cxt) => PingModel.ping(type, params, cxt)
  }
};

export {
  schema,
  resolver
};
