import _ from 'lodash'

export const STREAM_INDEX_ID = {};
export const STREAM_TABLE = [];

export const get = ({
  streamid
}, {}, cxt) => {
  return STREAM_INDEX_ID[streamid] || null;
}
