import _ from 'lodash'
import {schema as WorkspaceQueriesSchema, resolver as WorkspaceQueriesResolver} from './queries';
import {schema as WorkspaceMutationsSchema, resolver as WorkspaceMutationsResolver} from './mutations';
import {schema as NamespaceSchema, resolver as NamespaceResolver} from './namespace';
import {schema as RepositorySchema, resolver as RepositoryResolver} from './repository';
import * as WorkspaceModel from 'Model/root/workspace'

const schema = [
  //...RepositorySchema,
  ...WorkspaceQueriesSchema,
  ...WorkspaceMutationsSchema,
  ...NamespaceSchema,
  ...RepositorySchema,
  `
    type Workspace {
      id: String!
      workspaceid: String!
      url: String!
      repository: Repository
      namespace: Namespace
    }
`
];

const resolver = {
  //...RepositoryResolver,
  ...WorkspaceQueriesResolver,
  ...WorkspaceMutationsResolver,
  ...NamespaceResolver,
  ...RepositoryResolver,
  Workspace: {
    repository: async (workspace, args, cxt) => await WorkspaceModel.Repository.get(workspace, {}, cxt),
    namespace: async (workspace, {}, cxt) => await WorkspaceModel.Repository.get(workspace, {}, cxt)
  }
};

export {
  schema,
  resolver
};
