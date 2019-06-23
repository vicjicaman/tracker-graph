import _ from 'lodash'
import {schema as QueriesSchema, resolver as QueriesResolver} from './queries';
import {schema as MutationsSchema, resolver as MutationsResolver} from './mutations';
import * as NamespaceSystemCommentModel from 'Model/system/comment'
import * as NamespaceSystemLabelModel from 'Model/system/label'

const schema = [
  ...QueriesSchema,
  ...MutationsSchema,
  `

  type NamespaceIssue {
    id: String!
    issueid: String!
    subject: String!
    status: String!
    description: String!
    created: Date!
    author: String!
    comments: [Comment]!
    labels: [Label]!
    entity: Entity!
  }
  `
];

const resolver = {
  ...QueriesResolver,
  ...MutationsResolver,
  NamespaceIssue: {
    comments: async (issue, args, cxt) => await NamespaceSystemCommentModel.list(issue, {}, cxt),
    labels: async (issue, args, cxt) => await NamespaceSystemLabelModel.list(issue, {}, cxt),
    entity: e => e
  }
};

export {
  schema,
  resolver
};
