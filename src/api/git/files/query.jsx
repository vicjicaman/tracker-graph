import {exec} from '../exec'
import _ from 'lodash'
import path from 'path'

export const diffs = async (repositoryid, {
  fileid,
  stage = true
}, cxt) => {

  try {
    const stream = await exec(repositoryid, "git diff " + (
      stage
      ? " --cached "
      : "") + fileid, {}, cxt);
    return stream.stdout === ""
      ? null
      : stream.stdout;
  } catch (e) {
    return null;
  }
}

export const commit = async (repositoryid, {
  branchid,
  fileid
}, cxt) => {

  try {
    const stream = await exec(repositoryid, "git log -n 1 --pretty=format:%H  " + branchid + " -- " + fileid, {}, cxt);
    return stream.stdout === ""
      ? null
      : stream.stdout;
  } catch (e) {
    return null;
  }
}

export const list = async (repositoryid, {
  nocache
}, cxt) => {

  const stream = await exec(repositoryid, "git status --porcelain --no-renames", {
    nocache
  }, cxt);

  const out = [];
  let match = null;

  const regexStatus = new RegExp("(.)(.)\\s(.+)", "g");
  while (match = regexStatus.exec(stream.stdout)) {
    const [full, staged, unstaged, filename] = match;
    const file = path.join(repositoryid, filename);
    out.push({
      id: file,
      fileid: filename,
      absolute: file,
      staged,
      unstaged,
      paths: {
        relative: {
          folder: "",
          file: filename
        },
        absolute: {
          folder: repositoryid,
          file
        }
      }
    });
  }

  return _.sortBy(out, [function(o) {
      return o.fileid;
    }
  ]);

}

export const isFileStaged = ({staged}) => {
  return [
    "A",
    "M",
    "D",
    "R",
    "C",
    "U"
  ].includes(staged)
}

export const isFileUnstaged = ({unstaged}) => {
  return ["M", "?", "D", "U"].includes(unstaged)
}

export const isFileUnmerge = ({unstaged, staged}) => {
  return staged === "U" || unstaged === "U";
}

export const checkFiles = (files, fn) => {

  for (const file of files) {
    if (fn(file)) {
      return true;
    }
  }

  return false;
}
