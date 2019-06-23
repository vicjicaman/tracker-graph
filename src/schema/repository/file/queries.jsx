import _ from 'lodash'
import * as RepositoryFiles from 'Model/repository/files'

const schema = [`

  type FileQueries {
    list : [File]!
  }

`];

const resolver = {
  FileQueries: {
    list: async (repository, {}, cxt) => await RepositoryFiles.list(repository, {}, cxt)
  }
};

export {
  schema,
  resolver
};
