import fs from 'fs'
import {exec} from './exec'
import path from 'path';

export const url = async (repositoryid, {}, cxt) => {
  const stream = await exec(repositoryid, "git config --get remote.origin.url", {}, cxt);
  const spt = stream.stdout.split('@')
  return spt[1].trim();
}

export const merging = (repositoryid, {}, cxt) => {

  const mergeFile = path.join(repositoryid, ".git/MERGE_HEAD");
  if (fs.existsSync(mergeFile)) {
    return fs.readFileSync(mergeFile);
  }

  return null;
}

export const user = async (repositoryid, {}, cxt) => {
  const stream = await exec(repositoryid, "git config user.name", {}, cxt);
  return stream.stdout.trim();
}

export const exists = async (repositoryid, {}, cxt) => {

  if (!fs.existsSync(repositoryid)) {
    return false;
  }

  return true;
}

export const hash = async (repositoryid, {}, cxt) => {

  const head = await exec(repositoryid, "git rev-parse HEAD", {
    nocache: true
  }, cxt);
  const status = await exec(repositoryid, "git diff HEAD --no-color", {
    nocache: true
  }, cxt);

  //console.log((head.stdout + "_" + status.stdout));
  return (head.stdout + "_" + status.stdout).hashCode();
}
