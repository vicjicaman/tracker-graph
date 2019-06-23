import {exec} from '../exec'
import * as MergesApi from '../merges'

export const abort = async (repositoryid, {}, cxt) => {
  const stream = await MergesApi.abort(repositoryid, {}, cxt);
}
