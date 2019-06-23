import _ from 'lodash'
import * as PingApi from 'Api/system/ping'

export const ping = async (type, params, cxt) => {
  return PingApi.ping(type, params, cxt);
}
