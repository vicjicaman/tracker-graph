import {wait} from '@nebulario/tracker-process'
import {DATA} from './query'

const set = async ({
  keyid,
  hash
}, promisedData) => {
  const HASH_DATA = DATA[hash];

  if (HASH_DATA[keyid]) {
    while (HASH_DATA[keyid] && HASH_DATA[keyid].processing) {
      await wait(5);
      //console.log(keyid + " wait for cache process... " + hash)
    }
  }

  if (!HASH_DATA[keyid]) {

    HASH_DATA[keyid] = {
      processing: true,
      hash,
      data: null
    };

    try {
      const res = await promisedData();
      HASH_DATA[keyid].data = res;
    } catch (e) {
      console.log("CACHE_PROCESSING:" + e.toString())
      throw e;
    } finally {
      HASH_DATA[keyid].processing = false;
    }
  }

  return HASH_DATA[keyid].data;
}

const get = ({keyid, hash}) => {
  const HASH_DATA = DATA[hash];

  if (!HASH_DATA[keyid]) {
    return null;
  }

  if (HASH_DATA[keyid].processing) {
    return null;
  }

  return HASH_DATA[keyid].data;
}

export const cache = async ({
  keyid,
  hash: rawHash
}, promisedData, opts = {}, cxt) => {
  const hash = rawHash || cxt.exeid;

  if (!DATA[hash]) {
    DATA[hash] = {};
  }

  const HASH_DATA = DATA[hash];

  const cached = get({keyid, hash});

  if (cached) {
    return cached;
  }

  return await set({
    keyid,
    hash
  }, promisedData);
}
