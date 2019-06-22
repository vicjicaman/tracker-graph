import _ from 'lodash'
import * as OperationModel from 'Model/system/operation'

const schema = [`

  type OperationMutations {
    operation (operationid: String!) : OperationEntityMutations
  }

  type OperationEntityMutations {
    stop : Operation!
    visibility (type:String) : Operation!
  }

`];

const resolver = {
  OperationMutations: {
    operation: async (parent, {
      operationid
    }, cxt) => OperationModel.get({}, {
      operationid
    }, cxt)
  },
  OperationEntityMutations: {
    stop: () => {},
    /**************************************************************************/
    visibility: async ({
      operationid
    }, {
      type
    }, cxt) => {
      return await OperationModel.visibility({
        operationid
      }, {
        visibility: type
      }, cxt);
    }
  }
};

export {
  schema,
  resolver
};
