import _ from 'lodash'
import * as PingApi from '@nebulario/tracker-ping'

export const ping = async (type, params, cxt) => {
  return PingApi.ping(type, params, cxt);
}
