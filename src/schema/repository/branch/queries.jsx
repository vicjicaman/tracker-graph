import _ from 'lodash'

const schema = [`

  type BranchQueries {
    list: [Branch]
    branch (branchid:String!) : Branch
  }

`];

const resolver = {};

export {
  schema,
  resolver
};
