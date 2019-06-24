import * as LabelApi from 'Api/namespace/system/label'
import * as GitApi from '@nebulario/tracker-git'

export const create = async (info, input, cxt) => {
  const {parent, parent: {
      namespace
    }, params} = info;

  const entity = await LabelApi.create(parent.entity, input, cxt);

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

  return entity;
}
