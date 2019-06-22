import _ from 'lodash'
import {schema as FileQueriesSchema, resolver as FileQueriesResolver} from './queries';
import {schema as FileMutationsSchema, resolver as FileMutationsResolver} from './mutations';

import * as RepositoryStashFiles from 'Model/repository/stash/files'

const schema = [
  ...FileQueriesSchema,
  ...FileMutationsSchema,
  `

    type StashFile {
      id: String!
      fileid: String!
      status: String
      content: String
    }
`
];

const resolver = {
  ...FileQueriesResolver,
  ...FileMutationsResolver,
  StashFile: {
    content: async (file, {}, cxt) => await RepositoryStashFiles.content(file, {}, cxt)
  }
};

export {
  schema,
  resolver
};
