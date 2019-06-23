import * as EntityApi from 'Api/utils/entity'
import * as GitFiles from 'Api/git/files'

export const updated = async (object, {}, cxt) => {
  const {entity, namespace} = object;

  await EntityApi.updated(entity, {}, cxt);

  const {
    paths: {
      absolute: {
        file: fileid
      }
    }
  } = entity;

  await GitFiles.stage(namespace.repositoryid, {
    fileid
  }, cxt);

}
