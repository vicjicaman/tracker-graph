import * as OperationApi from '@nebulario/tracker-operation'
import {apply as RepositoryApply} from '../apply'

export const apply = async (stash, {
  operation: {
    mapper,
    parent
  }
}, cxt) => {

  const operation = async (cxt) => {
    await RepositoryApply(stash, {}, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
