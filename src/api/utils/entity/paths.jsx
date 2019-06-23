import _ from 'lodash'
import path from 'path';
import {keys} from './keys'

export const paths = (entity, parent, entityidValueRaw, basedOn) => {
  const {entities} = keys(entity);
  const entityidValue = entityidValueRaw
    ? entityidValueRaw.toString()
    : entityidValueRaw;

  const root = parent.paths.root;
  const base = path.join(
    parent.paths.relative.folder, basedOn
    ? basedOn
    : "",
  entities);
  const folder = entityidValue
    ? path.join(base, entityidValue)
    : null;
  const file = entityidValue
    ? path.join(folder, entity + ".json")
    : null;

  const relative = {
    base,
    folder,
    file
  };

  /*
  console.log("ENTITY: " + entity)
  console.log(parent.paths)
  console.log(JSON.stringify({
    root,
    relative,
    absolute: _.reduce(relative, (res, v, k) => {
      res[k] = v
        ? path.join(root, v)
        : null;
      return res;
    }, {})
  }, null, 2));*/

  return {
    root,
    relative,
    absolute: _.reduce(relative, (res, v, k) => {
      res[k] = v
        ? path.join(root, v)
        : null;
      return res;
    }, {}),
    parent,
    entity
  };
};
