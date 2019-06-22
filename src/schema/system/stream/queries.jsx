import _ from 'lodash'
import * as StreamModel from 'Model/system/stream'

const schema = [`

  type StreamQueries {
    stream (streamid: String!) : Stream
  }


`];

const resolver = {

  StreamQueries: {
    // --------------------------------------------------------------------------
    stream: async ({}, {
      streamid
    }, cxt) => {

      return await StreamModel.get({}, {
        streamid
      }, cxt);
    }

  }

};

export {
  schema,
  resolver
};
