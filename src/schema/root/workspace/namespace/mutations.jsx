import _ from 'lodash'

const schema = [`

  type WorkspaceNamespaceMutations {
    issues: WorkspaceIssueMutations!
  }

`];

const resolver = {

  WorkspaceNamespaceMutations: {
    issues: namespace => namespace
  }

};

export {
  schema,
  resolver
};
