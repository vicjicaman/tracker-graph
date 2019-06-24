import * as OperationApi from '@nebulario/tracker-operation'
import * as CommentApi from 'Api/namespace/system/comment'
import * as GitApi from '@nebulario/tracker-git'
import * as Git from '@nebulario/tracker-git'

import * as EntityOpsModel from 'Model/namespace/entity/operations'

export const create = async (info, {
  input
}, cxt) => {
  const {parent, parent: {
      namespace
    }, mapper} = info;

  const operation = async (cxt) => {

    const author = await Git.Query.user(namespace.repositoryid, {}, cxt);
    const entity = await CommentApi.create(parent.entity, {
      author,
      ...input
    }, cxt);

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
