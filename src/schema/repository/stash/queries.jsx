import _ from 'lodash'

import * as RepositoryStash from 'Model/repository/stash'

const schema = [`

  type StashQueries {
    list : [Stash]!
    stash (stashid: String!): Stash
  }

`];

const resolver = {

  StashQueries: {
    list: async (branch, {}, cxt) => await RepositoryStash.list(branch, {}, cxt),
    stash: async (branch, {
      stashid
    }, cxt) => await RepositoryStash.get(branch, {
      stashid
    }, cxt)
  }

};

export {
  schema,
  resolver
};
