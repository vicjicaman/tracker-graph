import path from 'path';
import fs from 'fs';
import {saveJson} from 'Api/utils/json'
import {keys} from './keys'
import {paths} from './paths';
import {exec} from '@nebulario/tracker-process'

export const create = async ({
  base: basedOn,
  entity,
  get,
  transform
}, parent, input, cxt) => {

  const {entityid} = keys(entity);
  const entityIdValue = input[entityid];
  const lspaths = paths(entity, parent, entityIdValue, basedOn);

  const curr = await get(parent, {
    [entityid]: entityIdValue
  }, cxt);

  if (curr.haveFile) {
    throw new FlowError("ENTITY_EXISTS", {
      values: {
        entity,
        entityid: entityIdValue,
        status: curr.status
      }
    });
  }

  await exec(['mkdir -p ' + lspaths.absolute.folder], {}, {}, cxt);

  const jnow = Math.floor(new Date() / 1000);
  const pre = {
    created: jnow,
    updated: jnow,
    status: "active"
  };

  const res = {
    ...(
      transform
      ? await transform(pre, input)
      : input),
    ...pre
  }

  saveJson(lspaths.absolute.file, res);

  const ent = await get(parent, {
    [entityid]: entityIdValue
  }, cxt);

  return ent;
}
