import * as LabelApi from 'Api/namespace/system/label'
import * as GitFiles from 'Api/git/files'

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

  await GitFiles.stage(namespace.repositoryid, {
    fileid
  }, cxt);

  return entity;
}
