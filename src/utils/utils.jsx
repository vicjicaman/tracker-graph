import path from 'path';
import fs from 'fs';

export const isDirectory = source => fs.lstatSync(source).isDirectory()
export const isFile = source => fs.lstatSync(source).isFile()
export const getDirectories = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
export const getFiles = (source, ext) => {

  if (!fs.existsSync(source)) {
    return [];
  }

  return fs.readdirSync(source).map(name => path.join(source, name)).filter(isFile).filter(source => source.endsWith(ext))
}

export const saveJson = (path, json) => fs.writeFileSync(path, JSON.stringify(json, null, 2), 'utf8');
export const loadJson = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
