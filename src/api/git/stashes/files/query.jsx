import _ from 'lodash'
import {exec} from '../../exec'

export const content = async (repositoryid, {
  fileid,
  stashid
}, cxt) => {
  try {
    const stream = await exec(repositoryid, "git show " + stashid + ":" + fileid, {}, cxt);

    return stream.stdout;
  } catch (e) {
    return null;
  }
}

export const list = async (repositoryid, {
  stashid
}, cxt) => {

  const stream = await exec(repositoryid, "git stash show --name-status -r " + stashid, {}, cxt);

  const out = [];
  let match = null;

  const regexStatus = new RegExp("(.)\\s(.+)", "g");
  while (match = regexStatus.exec(stream.stdout)) {
    const [full, status, filename] = match;

    out.push({
      fileid: filename,
      status,
      paths: {
        relative: {
          folder: "",
          file: filename
        },
        absolute: null
      }
    });
  }

  return _.sortBy(out, [function(o) {
      return o.fileid;
    }
  ]);
}


export const diffs = async (repositoryid, {
  stashid
}, cxt) => {

  const stream = await exec(repositoryid, "git diff --no-commit-id --name-status -r " + stashid, {}, cxt);

  const out = [];
  let match = null;

  const regexStatus = new RegExp("(.)\\s(.+)", "g");
  while (match = regexStatus.exec(stream.stdout)) {
    const [full, status, filename] = match;

    out.push({
      fileid: filename,
      status,
      paths: {
        relative: {
          folder: "",
          file: filename
        },
        absolute: null
      }
    });
  }

  return _.sortBy(out, [function(o) {
      return o.fileid;
    }
  ]);
}
