import path from 'path';
import fs from 'fs';
import {exec} from './exec'
import * as Query from './query'

export const clone = async (repositoryid, {
  url
}, cxt) => {

  const exists = await Query.exists(repositoryid, {}, cxt);
  if (exists) {
    return false;
  }

  await exec(null, 'git clone git@' + url + ' ' + repositoryid, {}, cxt);
  return true;
}
