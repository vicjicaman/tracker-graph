import _ from 'lodash'
import {wait} from '@nebulario/tracker-process'

export const PING_DATA = {};

export const ping = (type, params, cxt) => {

  if (!PING_DATA[type]) {
    PING_DATA[type] = {};
  }

  const key = _.reduce(params, (res, v) => res + ":" + v, "ping");

  if (!PING_DATA[type][key]) {
    PING_DATA[type][key] = {
      params,
      timestamp: new Date().getTime()
    };
  }

}
