import fs from 'fs';
import {getDirectories} from 'Api/utils/path'
import {loadJson} from 'Api/utils/json'

export const paths = (attribute, parent) => {
  const elements = attribute.split('.');

  const attr = element.length === 0
    ? attribute
    : elements[elements.length - 1];

  const file = attr + ".json";

  return {
    relative: {
      folder: parent.paths.relative.folder,
      file: path.join(parent.paths.relative.folder, file)
    },
    absolute: {
      folder: parent.paths.absolute.folder,
      file: path.join(parent.paths.absolute.folder, file)
    }
  }

};

export const get = async ({
  attribute,
  transform
}, parent, cxt) => {
  const lspaths = paths(attribute, parent);

  let content = null;

  if (fs.existsSync(lspaths.absolute.file)) {
    content = loadJson(lspaths.absolute.file);
  }

  return await transform(content);
}

export const update = async ({
  attribute,
  get
}, parent, input, cxt) => {
  const lspaths = paths(attribute, parent);

  saveJson(paths.absolute.file, input);
  return get(parent, cxt);
}
