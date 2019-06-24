import * as OperationApi from '@nebulario/tracker-operation'
import * as GitApi from '@nebulario/tracker-git'

export const stage = async (file, {
  operation: {
    mapper,
    parent
  }
}, cxt) => {
  const {repository: {
      repositoryid
    }, fileid} = file;

  const operation = async (cxt) => {
    await GitApi.Files.stage(repositoryid, {
      fileid
    }, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
