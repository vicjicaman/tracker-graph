import _ from 'lodash'

const schema = [`

  type SystemMutations {
    operations: OperationMutations
  }

`];

const resolver = {
  SystemMutations: {
    operations: (viewer) => viewer
  }
};

export {
  schema,
  resolver
};
