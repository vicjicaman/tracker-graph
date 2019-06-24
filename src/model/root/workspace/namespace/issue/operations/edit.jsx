import * as OperationApi from '@nebulario/tracker-operation'
import * as IssueApi from 'Api/namespace/issue'
import * as GitApi from '@nebulario/tracker-git'
import * as IssueModel from 'Model/root/workspace/namespace/issue'

export const edit = async (issue, {
  input
}, cxt) => {

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
      }
    } = issue;

    const res = await IssueApi.update.general(issue.entity, input, cxt);

    if (res) {
      await GitApi.Files.stage(repositoryid, {
        fileid
      }, cxt);
    }

  };

  return await OperationApi.start(issue, {
    mapper: IssueModel.Mapper.operation
  }, operation, cxt);
}
