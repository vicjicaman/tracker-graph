import * as OperationApi from 'Api/system/operation'
import * as EntityModel from 'Model/namespace/entity'
import * as IssueApi from 'Api/namespace/issue'
import * as GitFiles from 'Api/git/files'
import * as IssueModel from 'Model/root/workspace/namespace/issue'

export const remove = async (issue, {}, cxt) => {

  const operation = async (cxt) => {
    const {
      namespace,
      namespace: {
        repositoryid,
        branchid
      },
      entity: {
        paths: {
          relative: {
            file: fileid
          }
        }
      },
      entity
    } = issue;

    await IssueApi.remove(issue.entity, {
      ignore: false
    }, cxt);

    await GitFiles.stage(repositoryid, {
      fileid
    }, cxt);

  };

  return await OperationApi.start(issue, {
    mapper: IssueModel.Mapper.operation
  }, operation, cxt);
}
