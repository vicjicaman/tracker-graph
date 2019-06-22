import _ from 'lodash'
import * as IssueModel from 'Model/root/workspace/namespace/issue'

const schema = [`

  type NamespaceIssueQueries {
    list : [NamespaceIssue]!
    issue (issueid: String!) : NamespaceIssue
  }


`];

const resolver = {
  NamespaceIssueQueries: {
    // --------------------------------------------------------------------------
    list: async (repository, args, cxt) => {
      return await IssueModel.list(repository, {}, cxt);
    },
    // --------------------------------------------------------------------------
    issue: async (repository, {
      issueid
    }, cxt) => {
      return await IssueModel.get(repository, {
        issueid
      }, cxt)
    }
  }
};

export {
  schema,
  resolver
};
