import _ from 'lodash'
import * as OperationApi from 'Api/system/operation'

export const get = async (system, args, cxt) => {
  const op = OperationApi.get(system, args, cxt);
  if (!op) {
    return null;
  }

  return {
    ...op,
    data: op.mapper ?
      op.mapper(op) : null
  };
}

export const list = async (system, args, cxt) => {
  const list = OperationApi.list(system, {
    visibility: "hidden",
    status: OperationApi.Status.FINISH
  }, cxt);
  return _.map(list, op => ({
    ...op,
    data: op.mapper ?
      op.mapper(op) : null
  }));
}
