import _ from "lodash";

export const get = async (repository, {
  branchid,
  baselineid
}, cxt) => {

  const branch = {
    id: repository.id + "_" + branchid,
    branchid,
    baselineid,
    repository
  };

  return branch;
}
