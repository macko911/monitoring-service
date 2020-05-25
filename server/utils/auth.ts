import { Response } from 'express'

/**
 * Respond with unified Unauthorized message
 * @param res express response object
 */
export function unauthorized (res: Response) {
  res
    .status(401)
    .json({
      msg: 'You are not allowed access to this endpoint.',
    })
}
