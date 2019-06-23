import _ from 'lodash'
import {schema as FileQueriesSchema, resolver as FileQueriesResolver} from './queries';
import {schema as FileMutationsSchema, resolver as FileMutationsResolver} from './mutations';

import * as RepositoryFiles from 'Model/repository/files'

const schema = [
  ...FileQueriesSchema,
  ...FileMutationsSchema,
  `

    type FileContent {
      current: String,
      previous: String
    }

    type File {
      id: String!
      fileid: String!
      absolute: String!
      staged: String
      unstaged: String
      content: FileContent
      filemeta: JSON
    }
`
];

const resolver = {
  ...FileQueriesResolver,
  ...FileMutationsResolver,
  File: {
    content: file => file,
    filemeta: async (file, {}, cxt) => await RepositoryFiles.filemeta(file, {}, cxt)
  },
  FileContent: {
    current: async (file, {}, cxt) => await RepositoryFiles.current(file, {}, cxt),
    previous: async (file, {}, cxt) => await RepositoryFiles.previous(file, {}, cxt)
  }
};

export {
  schema,
  resolver
};
