import _ from 'lodash'
import * as OperationModel from 'Model/system/operation'

const schema = [`

  type OperationQueries {
    list (ownerid: String) : [Operation]!
    operation (operationid: String!) : Operation
  }


`];

const resolver = {

  OperationQueries: {
    // --------------------------------------------------------------------------
    list: async ({
      userid
    }, args, cxt) => {

      const list = await OperationModel.list({}, {}, cxt);
      return list;
    },
    // --------------------------------------------------------------------------
    operation: async ({
      userid
    }, {
      operationid
    }, cxt) => {

      return await OperationModel.get({
        operationid
      }, {}, cxt);
    }

  }

};

export {
  schema,
  resolver
};
