import _ from 'lodash'
import {
  schema as QueriesSchema,
  resolver as QueriesResolver
} from './queries';
import {
  schema as MutationsSchema,
  resolver as MutationsResolver
} from './mutations';

const schema = [
  ...QueriesSchema,
  ...MutationsSchema,
  `

  type OperationMessage {
      messageid: String!
      values: JSON
  }

  type Operation {
      id: String!
      operationid: String!
      config: JSON!
      data: JSON
      status: String!
      startedOn: Date!
      finishedOn: Date
      stream: Stream!
      message: OperationMessage
      visibility: String!
    }

  `
];

const resolver = {
  ...QueriesResolver,
  ...MutationsResolver,
  Operation: {
    data: op => op.mapper ? op.mapper(op) : null
  }
};

export {
  schema,
  resolver
};
