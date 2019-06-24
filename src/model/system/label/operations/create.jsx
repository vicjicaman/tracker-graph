import * as OperationApi from '@nebulario/tracker-operation'
import * as LabelApi from 'Api/namespace/system/label'
import * as GitApi from '@nebulario/tracker-git'

import * as EntityOpsModel from 'Model/namespace/entity/operations'

export const create = async (info, {
  input
}, cxt) => {
  const {parent, parent: {
      namespace
    }, mapper} = info;

  const operation = async (cxt) => {

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

    //await EntityOpsModel.updated(parent, {}, cxt);
  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);

}
