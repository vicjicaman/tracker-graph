import * as OperationApi from 'Api/system/operation'
import * as CommentApi from 'Api/namespace/system/comment'
import * as GitFiles from 'Api/git/files'

import * as EntityOpsModel from 'Model/namespace/entity/operations'

export const remove = async (info, {}, cxt) => {
  const {
    comment,
    info: {
      parent,
      parent: {
        namespace
      },
      params
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

      await GitFiles.stage(namespace.repositoryid, {
        fileid
      }, cxt);

      //await EntityOpsModel.updated(parent, {}, cxt);
    }

  };

  return await OperationApi.start(parent, {
    params
  }, operation, cxt);

}
