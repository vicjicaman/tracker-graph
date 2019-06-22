import path from 'path';
import fs from 'fs';
import {loadJson, saveJson} from 'Api/utils/json'
import {keys} from './keys'
import {exec} from '@nebulario/tracker-process'

export const remove = async (curr, opts, cxt) => {
  const {
    ignore = true
  } = opts;

  if (curr) {

    if (ignore) {
      const raw = loadJson(curr.paths.absolute.file);
      raw.status = "ignore";
      saveJson(curr.paths.absolute.file, raw);
    } else {
      await exec(['rm -R ' + curr.paths.absolute.folder], {}, {}, cxt);
    }

    return true;
  }

  return false;
}
