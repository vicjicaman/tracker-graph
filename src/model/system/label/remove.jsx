import * as LabelApi from 'Api/namespace/system/label'
import * as GitFiles from 'Api/git/files'

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

    await GitFiles.stage(namespace.repositoryid, {
      fileid
    }, cxt);

    return true;
  }

  return false;
}
