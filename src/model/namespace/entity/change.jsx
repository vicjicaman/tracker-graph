import * as GitFilesApi from 'Api/git/files'

export const change = async (obj, fn, cxt) => {

  await fn(obj, cxt);

  const {
    namespace: {
      repositoryid
    },
    entity: {
      paths: {
        relative: {
          file: fileid
        }
      }
    }
  } = obj;

  await GitFilesApi.stage(repositoryid, {
    fileid
  }, cxt);

}
