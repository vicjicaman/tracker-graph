import path from 'path'

export const getGroupFileChange = (file) => {

  const {fileid, staged, status} = file;

  const comps = fileid.split("/");

  let current = {
    sub: {},
    path: ""
  };
  const res = current;
  for (const comp of comps) {
    if (!current.sub[comp]) {
      current.sub[comp] = {
        path: path.join(current.path, comp),
        leaf: false,
        sub: {}
      };
    }
    current = current.sub[comp];
  }

  current.leaf = true;
  current.file = {
    fileid,
    status: status || staged
  };

  return res;
}

export const filemeta = async (repository, {
  file, current // previous
}, cxt) => {

  const groups = getGroupFileChange(file);

  const res = {};
  for (const type in groups.sub) {
    const entity = groups.sub[type];
    if (type === "issues") {
      for (const issueid in entity.sub) {
        const issue = entity.sub[issueid];

        if (issue.leaf === false) {
          const issueFile = path.join(type, issueid, "issue.json");

          const genFile = {
            ...file,
            status: "",
            staged: "",
            unstaged: "",
            paths: {
              relative: {
                file: issueFile
              },
              absolute: {
                file: path.join(repository.repositoryid, issueFile)
              }
            },
            repository
          }

          const currContent = await current(genFile, {}, cxt);
          res[issue.path] = JSON.parse(currContent.toString());
        }

      }
    }

  }

  return res;
}
