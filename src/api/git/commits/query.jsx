import _ from 'lodash'
import {exec} from '../exec'

const COMMIT_PAGE_SIZE = 15;
const logFormat = "\"%H<RF_FD/>%an<RF_FD/>%B<RF_FD/>%P<RF_FD/>%cn<RF_CL/>\"";

const parseCommitLog = (log, cxt) => {
  const rawcommits = log.trim().split("<RF_CL/>");
  const out = [];

  for (const raw of rawcommits) {
    if (raw === "") {
      continue;
    }

    const [commitid, author, message, parents, commiter] = raw.trim().split("<RF_FD/>");
    out.push({commitid, message, author, parents: parents.split(" "), commiter});
  }

  return out;

}

export const get = async (repositoryid, {
  commitid
}, cxt) => {

  if (!commitid) {
    return null;
  }

  const stream = await exec(repositoryid, "git log --format=" + logFormat + " -n 1 " + commitid, {}, cxt);
  const log = parseCommitLog(stream.stdout, cxt);

  return log[0];
}

export const list = async (repositoryid, {
  baselineid = null,
  branchid = null,
  commitid = null
}, cxt) => {

  let stream = null;

  if ((baselineid || commitid) && branchid) {
    stream = await exec(repositoryid, "git log -n " + COMMIT_PAGE_SIZE + " " + (
      commitid
      ? commitid
      : baselineid) + "..." + branchid + " --format=%H", {
      cache: {
        type: "execution"
      }
    }, cxt);

  } else {
    stream = await exec(repositoryid, "git log -n " + COMMIT_PAGE_SIZE + " --format=%H", {
      cache: {
        type: "execution"
      }
    }, cxt);
  }

  const trimmed = stream.stdout.trim();
  if (trimmed === "") {
    return []
  } else {
    return trimmed.split("\n");
  }
}

export const current = async (repositoryid, {
  branchid
}, cxt) => {

  try {
    const stream = await exec(repositoryid, "git rev-parse " + branchid, {}, cxt);
    return stream.stdout.trim();
  } catch (e) {
    return null;
  }

}

export const common = async (repositoryid, {
  baselineid,
  branchid
}, cxt) => {
  try {
    const stream = await exec(repositoryid, "git merge-base " + baselineid + " " + branchid, {}, cxt);

    return stream.stdout.trim();
  } catch (e) {
    return null;
  }

}

export const remote = async (repositoryid, {
  branchid
}, cxt) => {

  try {
    const stream = await exec(repositoryid, "git rev-parse origin/" + branchid, {}, cxt);
    return stream.stdout.trim();
  } catch (e) {
    return null;
  }

}

export const base = async (repositoryid, {
  branchid
}, cxt) => {

  try {
    const stream = await exec(repositoryid, "git merge-base " + branchid + " origin/" + branchid, {}, cxt);
    return stream.stdout.trim();
  } catch (e) {
    return null;
  }

}

export const branches = async (repositoryid, {
  commitid
}, cxt) => {

  try {
    const stream = await exec(repositoryid, "git branch -a --no-color --contains  " + commitid, {}, cxt);

    const out = [];
    let match = null;

    const regexStatus = new RegExp(".{2}(.+)", "g");
    while (match = regexStatus.exec(stream.stdout)) {
      const [full, branchid] = match;

      if (!branchid.includes("remotes/origin/HEAD")) {
        out.push(branchid.replace("remotes/", ""));
      }
    }

    return out;

  } catch (e) {
    return null;
  }

}
