import _ from 'lodash'
import * as WorkspaceModel from 'Model/root/workspace'
import * as WorkspaceOps from 'Model/root/workspace/operations'

const schema = [`

    type WorkspaceMutations {
      create (workspaceid: String!, url: String!) : Operation!
      workspace (workspaceid: String!) : WorkspaceEntityMutations!
    }

    type WorkspaceEntityMutations {
      remove : Operation!
      repository: WorkspaceRepositoryMutations
      namespace: WorkspaceNamespaceMutations
    }
`];

const resolver = {
  WorkspaceMutations: {
    create: async (viewer, {
      workspaceid,
      url
    }, cxt) => await WorkspaceOps.create(viewer, {
      workspaceid,
      url
    }, cxt),
    workspace: async (viewer, {
      workspaceid
    }, cxt) => await WorkspaceModel.get(viewer, {
      workspaceid
    }, cxt)
  },
  WorkspaceEntityMutations: {
    repository: async (workspace, args, cxt) => await WorkspaceModel.Repository.get(workspace, {}, cxt),
    namespace: async (workspace, {}, cxt) => await WorkspaceModel.Repository.get(workspace, {}, cxt)

  }
};

export {
  schema,
  resolver
};
