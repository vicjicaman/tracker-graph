import * as GitFilesApi from '@nebulario/tracker-git'

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

  await GitApi.Files.stage(repositoryid, {
    fileid
  }, cxt);

}
