import _ from 'lodash'
import * as StreamApi from 'Api/system/stream'

export const get = async (system, {
  streamid
}, cxt) => {
  return StreamApi.get({
    streamid
  }, {}, cxt);
}
