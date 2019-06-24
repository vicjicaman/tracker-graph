import * as OperationApi from '@nebulario/tracker-operation'
import {stash} from '../stash'
const uuidv4 = require('uuid/v4');

export const save = async (repository, {
  input: {
    message
  },
  operation: {
    mapper,
    parent
  }
}, cxt) => {

  const operation = async (cxt) => {

    await stash(repository, {
      groupid: uuidv4(),
      message
    }, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
