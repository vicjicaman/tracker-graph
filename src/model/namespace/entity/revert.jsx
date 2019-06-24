import * as GitApi from '@nebulario/tracker-git'
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

  const rev = await GitApi.Commits.Files.revision(repositoryid, {
    fileid
  }, cxt);

  if (rev) {
    await GitApi.Files.checkout(repositoryid, {
      fileid,
      commitid: "HEAD"
    }, cxt);
  } else {
    fs.unlinkSync(absFileid);
  }

  await GitApi.Files.stage(repositoryid, {
    fileid
  }, cxt);

}
