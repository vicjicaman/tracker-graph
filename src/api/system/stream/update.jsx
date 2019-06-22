import _ from 'lodash'
import * as Query from './query'
import * as EventApi from 'Api/system/events'

export const addFrame = ({
  streamid
}, {
  metadata,
  data,
  type,
  label
}, cxt) => {

  if (data === null) {
    return;
  }

  const stream = Query.get({
    streamid
  }, {}, cxt);

  if (stream) {
    stream.updatedOn = new Date();

    const frame = {
      frameid: stream.sequence++,
      metadata,
      data,
      type,
      label,
      addedOn: stream.updatedOn
    };

    stream.frames.unshift(frame);
    if (stream.frames > 500) {
      stream.frames.length = 500;
    }

    EventApi.send('commands', {
      event: 'stream.frame',
      payload: {
        streamid,
        frame
      }
    }, cxt);

    return frame;
  }

  return null;
}

export const clear = ({
  streamid
}, {}, cxt) => {

  const stream = Query.get({
    streamid
  }, {}, cxt);

  if (stream) {
    stream.updatedOn = new Date();
    stream.frames.length = 0;
  }

  return null;
}
