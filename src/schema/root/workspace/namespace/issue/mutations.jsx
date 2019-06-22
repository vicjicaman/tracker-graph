import _ from 'lodash'
import * as IssueModel from 'Model/root/workspace/namespace/issue'

const schema = [`

  input WorkspaceIssueCreateInput {
    subject: String!
    description: String!
  }

  input WorkspaceIssueEditInput {
    subject: String!
    description: String!
  }

  type WorkspaceIssueMutations {
    create (input: WorkspaceIssueCreateInput!) : Operation!
    issue (issueid: String!) : WorkspaceIssueEntityMutations!
  }

  type WorkspaceIssueEntityMutations {
    labels: LabelMutations!
    comments: CommentMutations!
    edit (input: WorkspaceIssueEditInput!) : Operation!
    remove : Operation!
  }

`];

const resolver = {
  WorkspaceIssueMutations: {
    create: async (namespace, {
      input
    }, cxt) => {

      return await IssueOperation.create(namespace, {
        input
      }, cxt);

    },
    issue: async (namespace, {
      issueid
    }, cxt) => {

      const res = await IssueModel.get(namespace, {
        issueid
      }, cxt);

      return res;
    }
  },
  WorkspaceIssueEntityMutations: {
    labels: issue => ({
      parent: issue,
      mapper: IssueModel.Mapper.operation
    }),
    comments: issue => ({
      parent: issue,
      mapper: IssueModel.Mapper.operation
    }),
    edit: async (issue, {
      input
    }, cxt) => {
      return await IssueOperation.edit(issue, {
        input
      }, cxt);
    },
    remove: async (issue, {}, cxt) => {
      return await IssueOperation.remove(issue, {}, cxt);
    }
  }
};

export {
  schema,
  resolver
};
