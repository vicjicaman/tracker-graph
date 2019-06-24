import * as GitApi from '@nebulario/tracker-git'

const summary = async (namespace, {
  branchid,
  object
}, cxt) => {

  const {repositoryid} = namespace;

  const {
    entity: {
      paths: {
        relative: {
          file: fileid
        }
      }
    }
  } = object;

  const diffs = await GitApi.Files.diffs(repositoryid, {
    fileid
  }, cxt);

  const commitid = await GitApi.Files.commit(repositoryid, {
    fileid,
    branchid
  }, cxt);

  const branches = commitid
    ? await GitApi.Commits.branches(repositoryid, {
      commitid
    }, cxt)
    : [];

  const summary = {
    diffs,
    commitid,
    remote: commitid
      ? branches.includes("origin/" + branchid)
      : false
  }

  return summary
}

export const branch = async (object, {}, cxt) => {

  const {namespace, namespace: {
      branchid
    }} = object;

  if (!branchid) {
    return null;
  }

  return await summary(namespace, {
    object,
    branchid
  }, cxt);
}

export const baseline = async (object, {}, cxt) => {

  const {namespace, namespace: {
      baselineid
    }} = object;

  if (!baselineid) {
    return null;
  }

  return await summary(namespace, {
    object,
    branchid: baselineid
  }, cxt);

}
