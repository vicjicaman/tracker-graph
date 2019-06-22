import * as OperationApi from 'Api/system/operation'
import * as GitFiles from 'Api/git/files'

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
    await GitFiles.stage(repositoryid, {
      fileid
    }, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
