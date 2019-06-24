import * as LabelApi from 'Api/namespace/system/label'
import * as GitApi from '@nebulario/tracker-git'

export const remove = async ({
  namespace,
  entity
}, {}, cxt) => {
  const res = await LabelApi.remove(entity, {}, cxt);

  if (res) {
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

    return true;
  }

  return false;
}
