import _ from 'lodash'
import {exec} from '../exec'

const logFormat = "\"%gd<RF_FD/>%H<RF_FD/>%an<RF_FD/>%B<RF_FD/>%P<RF_CL/>\"";

const parseStashLog = (log, cxt) => {
  const rawcommits = log.trim().split("<RF_CL/>");
  const out = [];

  for (const raw of rawcommits) {
    if (raw === "") {
      continue;
    }

    const [stashid, commitid, author, message: rawMessage, parents] = raw.trim().split("<RF_FD/>");
    out.push({stashid, commitid, message, author, parents: parents.split(" ")});
  }

  return out;
}

export const list = async (repositoryid, {}, cxt) => {
  const stream = await exec(repositoryid, "git stash list --format=" + logFormat, {}, cxt);
  return parseStashLog(stream.stdout, cxt);
}
