import * as OperationApi from '@nebulario/tracker-operation'
import * as GitApi from '@nebulario/tracker-git'

export const reset = async (repository, {
  operation: {
    parent,
    mapper
  }
}, cxt) => {

  const operation = async (cxt) => {
    const {repositoryid, branchid} = repository;

    const {status} = await GitApi.Branches.Summary.summary(repositoryid, {
      branchid
    }, cxt);

    if (status === "NEED_PUSH" || status === "DIVERGED") {
      await GitApi.Sync.reset(repositoryid, {}, cxt);
      await GitApi.Files.stage(repositoryid, {
        fileid: "."
      }, cxt);
    }

  };

  return await OperationApi.start(parent, {
    mapper
  }, operation, cxt);
}
