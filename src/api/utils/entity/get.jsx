import fs from 'fs';
import {getDirectories} from 'Api/utils/path';
import {loadJson} from 'Api/utils/json';
import {keys} from './keys';
import {paths} from './paths';

export const get = async ({
  base: basedOn,
  entity,
  transform
}, parent, input, cxt) => {
  const {entityid} = keys(entity);
  const entityIdValue = input[entityid];
  const lspaths = paths(entity, parent, entityIdValue, basedOn);

  const pre = {
    id: parent.id + "_" + entityIdValue,
    [entityid]: entityIdValue,
    parent,
    paths: lspaths
  };

  let transformed = {};
  let content = null;

  const haveFile = fs.existsSync(lspaths.absolute.file);

  if (haveFile) {
    content = loadJson(lspaths.absolute.file);
    pre.status = content.status;
    pre.created = new Date(content.created * 1000);
  }

  if (haveFile) {
    if (transform) {
      transformed = await transform(pre, content);
    } else {
      transformed = content;
    }
  }

  return {
    ...pre,
    ...transformed,
    haveFile
  };
}
