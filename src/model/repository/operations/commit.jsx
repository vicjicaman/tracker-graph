import * as OperationApi from 'Api/system/operation'
import * as GitSync from 'Api/git/sync'
import {changes} from './utils'

export const commit = async (repository, {
  input,
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {

    await GitSync.commit(repository.repositoryid, {
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
