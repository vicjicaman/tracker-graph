import _ from 'lodash'
import {schema as BranchQueriesSchema, resolver as BranchQueriesResolver} from './queries';
import {schema as BranchMutationsSchema, resolver as BranchMutationsResolver} from './mutations';
import {schema as CommitSchema, resolver as CommitResolver} from './commit';

import * as RepositoryBranch from 'Model/repository/branch'
import * as RepositoryMerge from 'Model/repository/merge'

const schema = [
  ...BranchQueriesSchema,
  ...BranchMutationsSchema,
  ...CommitSchema,
  `

    type AncestorSummary {
      status: String!
      merge: MergeSummary
      common: Commit
      head: Commit
      current: Commit
    }

    type MergeBackSummary {
      status: String!
      merge: MergeSummary
      common: Commit
      head: Commit
      current: Commit
    }

    type BranchSummary {
      status: String!
      merge: MergeSummary
      current: Commit
      base: Commit
      remote: Commit
    }

    type Branch {
      id: String!
      branchid: String!
      baselineid: String
      summary: BranchSummary!
      ancestor: AncestorSummary
      mergeback: MergeBackSummary
      commits: CommitQueries!
    }

`
];

const resolver = {
  ...BranchQueriesResolver,
  ...BranchMutationsResolver,
  ...CommitResolver,
  Branch: {
    summary: async (branch, {}, cxt) => await RepositoryBranch.summary(branch, {}, cxt),
    ancestor: async (branch, {}, cxt) => await RepositoryBranch.ancestor(branch, {}, cxt),
    mergeback: async (branch, {}, cxt) => await RepositoryBranch.mergeback(branch, {}, cxt),
    commits: branch => branch
  },
  BranchSummary: {
    merge: async ({
      status,
      branch,
      branch: {
        branchid
      }
    }, {}, cxt) => {

      if (status === "UP_TO_DATE" || status === "NEED_PUSH") {
        return null;
      }

      return await RepositoryMerge.summary(branch, {
        branchid,
        baselineid: branchid
      }, cxt);
    }
  },
  AncestorSummary: {
    merge: async ({
      status,
      branch,
      branch: {
        branchid,
        baselineid
      }
    }, {}, cxt) => {

      if (status === "ANCESTOR_UP_TO_DATE") {
        return null;
      }

      return await RepositoryMerge.summary(branch, {
        branchid,
        baselineid
      }, cxt);
    }
  },
  MergeBackSummary: {
    merge: async ({
      status,
      branch,
      branch: {
        branchid,
        baselineid
      }
    }, {}, cxt) => {

      if (status === "MERGED") {
        return null;
      }

      return await RepositoryMerge.summary(branch, {
        branchid,
        baselineid
      }, cxt);
    }
  }
};

export {
  schema,
  resolver
};
