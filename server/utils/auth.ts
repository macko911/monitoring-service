import { Response } from 'express'

export function unauthorized (res: Response) {
  res
    .status(401)
    .json({
      msg: 'You are not allowed access to this endpoint.',
    })
}
