import _ from 'lodash'

import * as RepositoryBranchCommit from 'Model/repository/branch/commit'

const schema = [`

  type CommitQueries {
    list : [Commit]!
    commit (commitid: String!): Commit
  }

`];

const resolver = {

  CommitQueries: {
    list: async (branch, {}, cxt) => await RepositoryBranchCommit.list(branch, {}, cxt),
    commit: async (branch, {
      commitid
    }, cxt) => await RepositoryBranchCommit.get(branch, {
      commitid
    }, cxt)
  }

};

export {
  schema,
  resolver
};
