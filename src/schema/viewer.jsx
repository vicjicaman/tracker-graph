import _ from 'lodash'
//import {resolve} from '../utils/graphql';

import {schema as SystemSchema, resolver as SystemResolver} from 'Schema/system';
import {schema as RepositorySchema, resolver as RepositoryResolver} from 'Schema/repository';
import {schema as WorkspaceSchema, resolver as WorkspaceResolver} from 'Schema/root/workspace';


const schema = [
  ...SystemSchema,
  ...RepositorySchema,
  ...WorkspaceSchema,
  `
    type Viewer {
      id: String!
      name: String!
      workspaces: WorkspaceQueries
      system: System!
    }

    type ViewerMutations {
      workspaces: WorkspaceMutations!
      system: SystemMutations!
    }
  `
];

const resolvers = {
  ...SystemResolver,
  ...RepositoryResolver,
  ...WorkspaceResolver,
  Viewer: {
    // --------------------------------------------------------------------------
    workspaces: viewer => viewer,
    system: viewer => viewer
  },
  ViewerMutations: {
    // --------------------------------------------------------------------------
    workspaces: viewer => viewer,
    system: viewer => viewer
  }
};

export {
  schema,
  resolvers
};

/**

workspace: resolve('workspace', async (parent, args, cxt) => {
  return get(args.id, cxt);
})

**/
