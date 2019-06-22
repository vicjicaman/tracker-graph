import {exec} from '../exec'

export const current = async (repositoryid, {}, cxt) => {
  const stream = await exec(repositoryid, "git branch | grep \\*", {}, cxt);
  return stream.stdout.substring(2).trim();
}

export const isLocal = async (repositoryid, {
  branchid
}, cxt) => {

  let res = false;
  try {
    await exec(repositoryid, "git rev-parse " + branchid, {}, cxt);
    res = true;
  } catch (e) {
    res = false;
  }

  return res;
}

export const isRemote = async (repositoryid, {
  branchid
}, cxt) => {

  let res = false;
  try {
    await exec(repositoryid, "git rev-parse origin/" + branchid, {}, cxt);
    res = true;
  } catch (e) {
    res = false;
  }

  return res;
}

export const isTracking = async (repositoryid, {
  branchid
}, cxt) => {
  const stream = await exec(repositoryid, "git branch -vv", {}, cxt);
  const regexStatus = new RegExp(".\\s+" + branchid + "\\s+.{7}\\s+\\[origin/" + branchid, "g");
  const res = regexStatus.test(stream.stdout);

  return res;
}

export const list = async (repositoryid, {}, cxt) => {

  const stream = await exec(repositoryid, "git branch --no-color", {}, cxt);

  const out = [];
  let match = null;

  const regexStatus = new RegExp(".{2}(.+)", "g");
  while (match = regexStatus.exec(stream.stdout)) {
    const [full, branchid] = match;
    out.push(branchid);
  }

  return out;

}
