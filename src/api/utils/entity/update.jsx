import path from 'path';
import fs from 'fs';
import {loadJson, saveJson} from 'Api/utils/json'

export const update = async (curr, fn, cxt) => {

  if (curr) {

    const raw = loadJson(curr.paths.absolute.file);
    const updated = fn
      ? await fn(raw)
      : raw;
    raw.updated = Math.floor(new Date() / 1000);
    saveJson(curr.paths.absolute.file, updated);

    return true;
  }

  return false;
}

export const updated = async (curr, {}, cxt) => {
  return update(curr, null, cxt);
}
