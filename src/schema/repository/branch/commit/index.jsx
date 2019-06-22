import _ from 'lodash'
import {schema as CommitQueriesSchema, resolver as CommitQueriesResolver} from './queries';
import {schema as CommitMutationsSchema, resolver as CommitMutationsResolver} from './mutations';
import {schema as FileSchema, resolver as FileResolver} from './file';
import * as RepositoryBranchCommit from 'Model/repository/branch/commit'

const schema = [
  ...CommitQueriesSchema,
  ...CommitMutationsSchema,
  ...FileSchema,
  `

    type Commit {
      id: String
      commitid: String
      message: String
      author: String
      commiter: String
      remote: Boolean
      files: CommitFileQueries
      type: String
      parents: [Commit]
    }
`
];

const resolver = {
  ...CommitQueriesResolver,
  ...CommitMutationsResolver,
  ...FileResolver,
  Commit: {
    files: commit => commit,
    parents: async (commit, {}, cxt) => await RepositoryBranchCommit.parents(commit, {}, cxt)
  }
};

export {
  schema,
  resolver
};
