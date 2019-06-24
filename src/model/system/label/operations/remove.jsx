import * as OperationApi from '@nebulario/tracker-operation'
import * as LabelApi from 'Api/namespace/system/label'
import * as GitApi from '@nebulario/tracker-git'

import * as EntityOpsModel from 'Model/namespace/entity/operations'

export const remove = async (info, {}, cxt) => {
  const {
    label,
    info: {
      parent,
      parent: {
        namespace
      },
      mapper
    }
  } = info;

  const operation = async (cxt) => {

    const res = await LabelApi.remove(label.entity, {}, cxt);

    if (res) {
      const {
        entity: {
          paths: {
            absolute: {
              file: fileid
            }
          }
        }
      } = label;

      await GitApi.Files.stage(namespace.repositoryid, {
        fileid
      }, cxt);

    }

  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);

}
