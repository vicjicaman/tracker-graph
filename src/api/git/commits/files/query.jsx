import _ from 'lodash'
import {exec} from '../../exec'

export const revision = async (repositoryid, {
  fileid,
  commitid,
  branchid,
  origin = false
}, cxt) => {
  try {

    const fromSrc = branchid
      ? (
        origin === true
        ? "origin/" + branchid
        : branchid)
      : commitid;

    const stream = await exec(repositoryid, "git show " + (
      fromSrc
      ? fromSrc
      : "HEAD") + ":" + fileid, {
      cache: {
        type: "execution"
      }
    }, cxt);

    return stream.stdout;
  } catch (e) {
    //console.log(e.toString());
    return null;
  }
}

export const list = async (repositoryid, {
  commitid
}, cxt) => {

  const stream = await exec(repositoryid, "git diff-tree --no-commit-id --name-status -r " + commitid, {}, cxt);

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
