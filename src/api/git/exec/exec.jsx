import _ from 'lodash';
import fs from 'fs'
import * as Process from '@nebulario/tracker-process';
import {wait} from '@nebulario/tracker-process';

const EXE_REPOSITORY_STATE = {};
const EXE_REPOSITORY_LOCK = {};

const EXE_REPOSITORY_CACHE = {};
const cacheExecution = (exeid, repositoryid, cmd, value) => {

  if (!EXE_REPOSITORY_CACHE[exeid]) {
    EXE_REPOSITORY_CACHE[exeid] = {};
  }

  if (!EXE_REPOSITORY_CACHE[exeid][repositoryid]) {
    EXE_REPOSITORY_CACHE[exeid][repositoryid] = {};
  }

  EXE_REPOSITORY_CACHE[exeid][repositoryid][cmd] = value;
}

export const clearExecutionCache = (exeid) => {
  delete EXE_REPOSITORY_CACHE[exeid];
}

const getExecutionCache = (exeid, repositoryid, cmd) => {

  if (!EXE_REPOSITORY_CACHE[exeid]) {
    return null;
  }

  if (!EXE_REPOSITORY_CACHE[exeid][repositoryid]) {
    return null;
  }

  return EXE_REPOSITORY_CACHE[exeid][repositoryid][cmd];
}

export const lock = async (repositoryid, fn, cxt) => {
  const repoState = EXE_REPOSITORY_STATE[repositoryid];

  while (EXE_REPOSITORY_LOCK[repositoryid] || (repoState && repoState.busy)) {
    await wait(10);
    //console.log(cxt.repositoryLock + " LOCKED REQUEST");
  }

  EXE_REPOSITORY_LOCK[repositoryid] = true;
  try {
    const res = await fn({
      ...cxt,
      repositoryLock: true
    });
    delete EXE_REPOSITORY_LOCK[repositoryid];
    return res;
  } catch (e) {
    console.log("REPOSITORY_ERROR: " + e.toString());
  } finally {
    delete EXE_REPOSITORY_LOCK[repositoryid];
  }

}

export const exec = async (repositoryid, cmd, {
  nocache
}, cxt) => {

  if (!EXE_REPOSITORY_STATE[repositoryid]) {
    EXE_REPOSITORY_STATE[repositoryid] = {};
  }
  const repoState = EXE_REPOSITORY_STATE[repositoryid];

  while (EXE_REPOSITORY_LOCK[repositoryid]) {

    if (cxt.repositoryLock === true) {
      break;
    }

    //console.log(cxt.repositoryLock + " LOCKED EXE");
    //console.log(cmd);
    await wait(10);
  }

  const {exeid} = cxt;
  let useCache = false;
  if (nocache !== true && cxt.type === "query") {
    useCache = true;
  }

  if (useCache) {
    const currentCache = getExecutionCache(exeid, repositoryid, cmd);
    if (currentCache) {
      //console.log("FROM CACHE -------------------------------------- EXECUTION  " + cmd)
      return currentCache;
    }
  }

  if (repositoryid !== null && !fs.existsSync(repositoryid)) {
    throw new Error("MODULE_REPOSITORY_NOT_FOUND");
  }

  let cmds = [];
  if (repositoryid !== null) {
    cmds.push("cd " + repositoryid)
  }
  cmds.push(cmd);

  //console.log(cmds);
  let res = null;
  repoState.busy = true;
  try {
    res = await Process.exec(cmds, {}, {}, cxt);
  } finally {
    repoState.busy = false;
  }

  if (useCache) {
    cacheExecution(exeid, repositoryid, cmd, res);
  }

  return res;
}
