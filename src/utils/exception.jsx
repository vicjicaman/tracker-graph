
export class FlowError extends Error {
  constructor(...args) {
    super(...args)
    this.payload = args[1]
    Error.captureStackTrace(this, FlowError)
  }
}
