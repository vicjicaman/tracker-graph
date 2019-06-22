import _ from 'lodash'
import {schema as QueriesSchema, resolver as QueriesResolver} from './queries';
import {schema as MutationsSchema, resolver as MutationsResolver} from './mutations';
import * as NamespaceEntityModel from 'Model/namespace/entity'

const schema = [
  ...QueriesSchema,
  ...MutationsSchema,
  `
  type EntityBranch {
    diffs: Boolean
    remote: Boolean
  }

  type Entity {
    branch: EntityBranch!
    baseline: EntityBranch
  }


  `
];

const resolver = {
  ...QueriesResolver,
  ...MutationsResolver,
  Entity: {
    branch: async (entity, args, cxt) => await NamespaceEntityModel.branch(entity, {}, cxt),
    baseline: async (entity, args, cxt) => await NamespaceEntityModel.baseline(entity, {}, cxt)
  }
};

export {
  schema,
  resolver
};
