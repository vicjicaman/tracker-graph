import _ from 'lodash'
import * as LabelModel from 'Model/system/label'
import * as LabelOperation from 'Model/system/label/operations'

const schema = [`

  input LabelCreateInput {
    labelid: String!
    type: String!
  }

  type LabelMutations {
    create (input: LabelCreateInput!) : Operation!
    label (labelid: String!) : LabelEntityMutations!
  }

  type LabelEntityMutations {
    remove : Operation!
  }

`];

const resolver = {
  LabelMutations: {
    create: async (info, {
      input
    }, cxt) => {

      return await LabelOperation.create(info, {
        input
      }, cxt);

    },
    label: async (info, {
      labelid
    }, cxt) => {
      const {parent} = info;

      const label = await LabelModel.get(parent, {
        labelid
      }, cxt);

      return {label, info};
    }
  },
  LabelEntityMutations: {
    remove: async (info, {}, cxt) => {
      return await LabelOperation.remove(info, {}, cxt);
    }
  }
};

export {
  schema,
  resolver
};
