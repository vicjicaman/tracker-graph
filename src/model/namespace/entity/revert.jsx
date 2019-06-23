import * as GitApi from 'Api/git'
import * as GitCommitFilesApi from 'Api/git/commits/files'
import * as GitFilesApi from 'Api/git/files'
import {summary} from './query'
import fs from 'fs'

export const revert = async (obj, {}, cxt) => {

  const {
    namespace: {
      repositoryid
    },
    entity: {
      paths: {
        absolute: {
          file: absFileid
        },
        relative: {
          file: fileid
        }
      }
    }
  } = obj;

  const rev = await GitCommitFilesApi.revision(repositoryid, {
    fileid
  }, cxt);

  if (rev) {
    await GitFilesApi.checkout(repositoryid, {
      fileid,
      commitid: "HEAD"
    }, cxt);
  } else {
    fs.unlinkSync(absFileid);
  }

  await GitFilesApi.stage(repositoryid, {
    fileid
  }, cxt);

}
