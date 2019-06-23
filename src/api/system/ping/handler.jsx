import _ from 'lodash'
import {wait} from '@nebulario/tracker-process'
import {PING_DATA} from './query'

const control = async (cxt) => {

  while (true) {
    await wait(2000);
    const now = new Date().getTime();

    for (const type in PING_DATA) {

      if (HANDLER_DATA[type]) {

        for (const key in PING_DATA[type]) {
          const ping = PING_DATA[type][key];
          delete PING_DATA[type][key];
          HANDLER_DATA[type](ping, cxt)
        }
      }
    }
  }
}

const HANDLER_DATA = {};
export const loop = (cxt) => {
  control(cxt).then(function() {
    console.log('PING_LOOP_TERMINATION');
  }).catch(function() {
    console.log('PING_LOOP_ERROR');
  });
}

export const handler = (type, handler) => {
  HANDLER_DATA[type] = handler;
}
