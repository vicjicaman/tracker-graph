import _ from 'lodash'
import {schema as FileQueriesSchema, resolver as FileQueriesResolver} from './queries';
import {schema as FileMutationsSchema, resolver as FileMutationsResolver} from './mutations';

import * as RepositoryCommitFiles from 'Model/repository/branch/commit/files'

const schema = [
  ...FileQueriesSchema,
  ...FileMutationsSchema,
  `

  type CommitFileContent {
    current: String,
    previous: String
  }

    type CommitFile {
      id: String!
      fileid: String!
      status: String
      filemeta: JSON
      content: CommitFileContent
    }
`
];

const resolver = {
  ...FileQueriesResolver,
  ...FileMutationsResolver,
  CommitFile: {
    content: file => file,
    filemeta: async (file, {}, cxt) => await RepositoryCommitFiles.filemeta(file, {}, cxt)
  },
  CommitFileContent: {
    current: async (file, {}, cxt) => await RepositoryCommitFiles.current(file, {}, cxt),
    previous: async (file, {}, cxt) => await RepositoryCommitFiles.previous(file, {}, cxt)
  }
};

export {
  schema,
  resolver
};
