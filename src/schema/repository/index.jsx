import _ from 'lodash'
import {schema as RepositoryQueriesSchema, resolver as RepositoryQueriesResolver} from './queries';
import {schema as RepositoryMutationsSchema, resolver as RepositoryMutationsResolver} from './mutations';
import {schema as FileSchema, resolver as FileResolver} from './file';
import {schema as BranchSchema, resolver as BranchResolver} from './branch';
import {schema as StashSchema, resolver as StashResolver} from './stash';
import {schema as MergeSchema, resolver as MergeResolver} from './merge';
import * as RepositoryBranch from 'Model/repository/branch'
import * as RepositoryMerge from 'Model/repository/merge'

const schema = [
  ...FileSchema,
  ...BranchSchema,
  ...MergeSchema,
  ...StashSchema,
  ...RepositoryQueriesSchema,
  ...RepositoryMutationsSchema,
  `

  type Repository {
    id: String!
    repositoryid: String!
    status: String!
    url: String!
    branchid: String!
    baselineid: String
    info: RepositoryInfo
  }

  type RepositoryInfo {
    branchid: String!
    url: String!
    merging: Commit
    files: FileQueries!
    stash: StashQueries!
    branch: Branch!
    baseline: Branch
  }

`
];

const resolver = {
  ...FileResolver,
  ...BranchResolver,
  ...MergeResolver,
  ...StashResolver,
  ...RepositoryQueriesResolver,
  ...RepositoryMutationsResolver,
  Repository: {
    info: (repository) => repository.status === "ready"
      ? repository
      : null
  },
  RepositoryInfo: {
    merging: async (repository, {}, cxt) => await RepositoryMerge.get(repository, {}, cxt),
    files: repository => repository,
    stash: repository => repository,
    branch: async (repository, {}, cxt) => await RepositoryBranch.get(repository, {
      branchid: repository.branchid,
      baselineid: repository.baselineid
    }, cxt),
    baseline: async (repository, {}, cxt) => await RepositoryBranch.get(repository, {
      branchid: repository.baselineid,
      baselineid: null
    }, cxt)
  }
};

export {
  schema,
  resolver
};
