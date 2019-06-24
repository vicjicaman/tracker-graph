import * as OperationApi from '@nebulario/tracker-operation'
import {revert as RepositoryRevert} from '../revert'

export const revert = async (stash, {
  operation: {
    mapper,
    parent
  }
}, cxt) => {

  const operation = async (cxt) => {
    await RepositoryRevert(stash, {}, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
