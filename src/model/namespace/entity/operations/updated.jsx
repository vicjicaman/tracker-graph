import * as EntityApi from 'Api/utils/entity'
import * as GitApi from '@nebulario/tracker-git'

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

  await GitApi.Files.stage(namespace.repositoryid, {
    fileid
  }, cxt);

}
