import _ from 'lodash'
import * as GitRepositoryCommitFiles from 'Model/repository/branch/commit/files'

const schema = [`

  type CommitFileQueries {
    list : [CommitFile]!
  }

`];

const resolver = {
  CommitFileQueries: {
    list: async (commit, {}, cxt) => await GitRepositoryCommitFiles.list(commit, {}, cxt)
  }
};

export {
  schema,
  resolver
};
