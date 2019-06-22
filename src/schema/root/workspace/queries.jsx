import _ from 'lodash'
import * as WorkspaceModel from 'Model/root/workspace'

const schema = [`

    type WorkspaceQueries {
      list : [Workspace]!
      workspace (workspaceid: String!) : Workspace
    }

`];

const resolver = {
  WorkspaceQueries: {
    // --------------------------------------------------------------------------
    list: async ({
      userid
    }, args, cxt) => {

      const res = await WorkspaceModel.list({
        userid
      }, {}, cxt);

      return res;
    },
    // --------------------------------------------------------------------------
    workspace: async ({
      userid
    }, {
      workspaceid
    }, cxt) => {

      const res = await WorkspaceModel.get({
        userid
      }, {
        workspaceid
      }, cxt);

      return res;
    }
  }
};

export {
  schema,
  resolver
};
