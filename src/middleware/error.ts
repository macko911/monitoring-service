import { ErrorRequestHandler } from 'express'

/**
 * Send generic error response on Errors thrown in Express middleware
 */
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err)
  let msg = process.env.NODE_ENV === 'production'
   ? 'Something wrong happened'
   : err.message

  res
    .status(500)
    .send({
      msg,
    })
}
