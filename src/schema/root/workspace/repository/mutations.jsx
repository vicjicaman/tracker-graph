import _ from 'lodash'
import * as WorkspaceModel from 'Model/root/workspace'
import * as WorkspaceOperations from 'Model/root/workspace/operations'
import * as RepositoryOps from 'Model/repository/operations'
import * as WorkspaceRepositoryOperations from 'Model/root/workspace/repository/operations'

const schema = [`

    type WorkspaceRepositoryMutations {
      merge: Operation!
      fetch: Operation!
      pull: Operation!
      push: Operation!
      commit: Operation!
      reset: Operation!
    }

`];

const getOperationInfo = (repository) => ({
  operation: {
    parent: repository.workspace,
    mapper: WorkspaceModel.Mapper.operation
  }
});
const resolver = {
  WorkspaceRepositoryMutations: {
    fetch: async (repository, {}, cxt) => await RepositoryOps.fetch(repository, getOperationInfo(repository), cxt),
    merge: async (repository, {}, cxt) => await WorkspaceRepositoryOperations.merge(repository, {}, cxt),
    pull: async (repository, {}, cxt) => await RepositoryOps.pull(repository, getOperationInfo(repository), cxt),
    push: async (repository, {}, cxt) => await RepositoryOps.push(repository, getOperationInfo(repository), cxt),
    commit: async (repository, {}, cxt) => await RepositoryOps.commit(repository, getOperationInfo(repository), cxt),
    reset: async (repository, {}, cxt) => await RepositoryOps.reset(repository, getOperationInfo(repository), cxt)
  }
};

export {
  schema,
  resolver
};
