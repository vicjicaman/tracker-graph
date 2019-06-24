import * as OperationApi from '@nebulario/tracker-operation'
import * as GitApi from '@nebulario/tracker-git'
import {changes} from './utils'

export const commit = async (repository, {
  input,
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {

    await GitApi.Sync.commit(repository.repositoryid, {
      message: input
        ? input.subject + "\n" + input.message
        : "-"
    }, cxt);

    return await changes(repository, {}, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
