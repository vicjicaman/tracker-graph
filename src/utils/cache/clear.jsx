import {DATA} from './query'
import {wait} from '@nebulario/tracker-process'

export const clearKey = ({hash, keyid}) => {

  const HASH_DATA = DATA[hash];

  if (HASH_DATA[keyid]) {
    /*while (HASH_DATA[keyid].processing) {
      console.log(keyid + " wait for cache process for clear... " + hash)
      await wait(50);
    }*/
    delete HASH_DATA[keyid];
  }

}

export const clearHash = (hash) => {
  const HASH_DATA = DATA[hash];

  for (const keyid in HASH_DATA) {
    clearKey({keyid, hash})
  }

}
