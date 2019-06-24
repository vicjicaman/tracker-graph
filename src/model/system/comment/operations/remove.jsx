import * as OperationApi from '@nebulario/tracker-operation'
import * as CommentApi from 'Api/namespace/system/comment'
import * as GitApi from '@nebulario/tracker-git'

import * as EntityOpsModel from 'Model/namespace/entity/operations'

export const remove = async (info, {}, cxt) => {
  const {
    comment,
    info: {
      parent,
      parent: {
        namespace
      },
      mapper
    }
  } = info;

  const operation = async (cxt) => {

    const res = await CommentApi.remove(comment.entity, {}, cxt);

    if (res) {
      const {
        entity: {
          paths: {
            absolute: {
              file: fileid
            }
          }
        }
      } = comment;

      await GitApi.Files.stage(namespace.repositoryid, {
        fileid
      }, cxt);

      //await EntityOpsModel.updated(parent, {}, cxt);
    }

  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);

}
