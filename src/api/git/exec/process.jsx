import * as Process from '@nebulario/tracker-process';

const onStreamFrame = ({
  type,
  label,
  data,
  metadata
}, cxt) => {

  const streams = cxt.streams;

  if (data === undefined || data === "" || data === null) {
    return;
  }

}

export const exec = async (cmds, opt, cnf, cxt) => {
  return await Process.exec(cmds, opt, {
    ...cnf,
    onStreamFrame
  }, cxt);
}

export const spawn = (cmd, args, opt, cnf, cxt) => {
  return Process.spawn(cmd, args, opt, {
    ...cnf,
    onStreamFrame: cnf.onStreamFrame
      ? cnf.onStreamFrame
      : onStreamFrame
  }, cxt);
}

export const addFrameToContextStream = onStreamFrame
