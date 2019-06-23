import * as OperationApi from 'Api/system/operation'
import {drop as RepositoryDrop} from '../drop'

export const drop = async (stash, {
  operation: {
    mapper,
    parent
  }
}, cxt) => {

  const operation = async (cxt) => {
    await RepositoryDrop(stash, {}, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
