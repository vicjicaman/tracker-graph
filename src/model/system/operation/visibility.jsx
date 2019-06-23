import _ from 'lodash'
import * as OperationApi from 'Api/system/operation'

export const visibility = async ({
  operationid
}, {
  visibility
}, cxt) => {

  const operation = OperationApi.get({}, {
    operationid
  }, cxt);

  if (!operation) {
    return null;
  }

  await OperationApi.update(operation, {
    visibility
  }, cxt);


  return operation;
}
