import _ from 'lodash'
import * as RepositoryStashFiles from 'Model/repository/stash/files'

const schema = [`

  type StashFileQueries {
    list : [StashFile]!
    diffs : [StashFile]!
  }

`];

const resolver = {
  StashFileQueries: {
    list: async (stash, {}, cxt) => await RepositoryStashFiles.list(stash, {}, cxt),
    diffs: async (stash, {}, cxt) => await RepositoryStashFiles.diffs(stash, {}, cxt)
  }
};

export {
  schema,
  resolver
};
