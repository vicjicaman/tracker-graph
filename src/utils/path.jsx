import _ from 'lodash'
import path from 'path';
import fs from 'fs';

export const getPaths = (parent, relative) => ({
  root: parent.paths.root,
  relative,
  absolute: _.reduce(relative, (res, v, k) => {
    res[k] = path.join(parent.paths.root, v);
    return res;
  }, {})
});

export const isDirectory = source => fs.lstatSync(source).isDirectory()
export const isFile = source => fs.lstatSync(source).isFile()
export const getDirectories = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
export const getFiles = (source, ext) => {

  if (!fs.existsSync(source)) {
    return [];
  }

  return fs.readdirSync(source).map(name => path.join(source, name)).filter(isFile).filter(source => source.endsWith(ext))
};
