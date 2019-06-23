import _ from 'lodash'
import * as CommentModel from 'Model/system/comment'
import * as CommentOperation from 'Model/system/comment/operations'


const schema = [`

  input CommentCreateInput {
    comment: String!
  }

  type CommentMutations {
    create (input: CommentCreateInput!) : Operation!
    comment (commentid: String!) : CommentEntityMutations!
  }

  type CommentEntityMutations {
    remove : Operation!
  }

`];

const resolver = {
  CommentMutations: {
    create: async (info, {
      input
    }, cxt) => {

      return await CommentOperation.create(info, {
        input
      }, cxt);

    },
    comment: async (info, {
      commentid
    }, cxt) => {
      const {parent} = info;

      const comment = await CommentModel.get(parent, {
        commentid
      }, cxt);

      return {comment, info};
    }
  },
  CommentEntityMutations: {
    remove: async (info, {}, cxt) => {
      return await CommentOperation.remove(info, {}, cxt);
    }
  }
};

export {
  schema,
  resolver
};
