import {
  list,
  isFileStaged,
  isFileUnmerge,
  checkFiles,
  commit,
  diffs
} from './query'
import {stage} from './stage'
import {unstage} from './unstage'
import {checkout} from './checkout'

export {
  list,
  stage,
  unstage,
  isFileUnmerge,
  isFileStaged,
  checkFiles,
  commit,
  diffs,
  checkout
}
