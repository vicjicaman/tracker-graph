import fs from 'fs';
import path from 'path';
import {getDirectories} from 'Api/utils/path'
import {keys} from './keys'
import {paths} from './paths';

export const list = async ({
  entity,
  get
}, parent, args, cxt) => { // import {keys} from './keys'
  const res = [];
  const {entityid} = keys(entity);
  const lspaths = paths(entity, parent);
  
  if (!fs.existsSync(lspaths.absolute.base)) {
    return [];
  }

  const dirs = getDirectories(lspaths.absolute.base);
  for (const folder of dirs) {
    const entityidValue = path.basename(folder);
    const ent = await get(parent, {
      [entityid]: entityidValue
    }, cxt);

    if (ent.status !== "ignore" && ent.haveFile) {
      res.push(ent);
    }

  }

  return res;
}
