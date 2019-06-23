import _ from 'lodash'
import {schema as QueriesSchema, resolver as QueriesResolver} from './queries';
import {schema as MutationsSchema, resolver as MutationsResolver} from './mutations';
import {schema as IssueSchema, resolver as IssueResolver} from './issue';

const schema = [
  ...QueriesSchema,
  ...MutationsSchema,
  ...IssueSchema,
  `

  type Namespace {
    id: String!
    namespaceid: String!
    issues: NamespaceIssueQueries
  }
  `
];

const resolver = {
  ...QueriesResolver,
  ...MutationsResolver,
  ...IssueResolver,
  Namespace: {
    issues: namespace => namespace
  }
};

export {
  schema,
  resolver
};
