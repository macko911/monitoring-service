import {ErrorRequestHandler} from 'express'

/**
 * Send generic error response on Errors thrown in Express middleware
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err)
  const msg = process.env.NODE_ENV === 'production'
    ? 'Something wrong happened'
    : err.message

  // set status to 500 if not already set
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500

  res
    .status(statusCode)
    .send({
      msg,
    })
}
