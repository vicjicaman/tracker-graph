import _ from 'lodash'
import {STREAM_TABLE, STREAM_INDEX_ID} from './query'
const uuidv4 = require('uuid/v4');

export const create = ({}, {
  streamid,
  config = {}
}, cxt) => {

  const stream = {
    id: streamid,
    streamid,
    updatedOn: null,
    config,
    frames: [],
    sequence: 0
  }

  STREAM_TABLE.push(stream);
  STREAM_INDEX_ID[streamid] = stream;
  return stream;
}
