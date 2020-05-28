import bcrypt from 'bcrypt'
import {Response} from 'express'

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

const SALT_ROUNDS = 10

/**
 * Hashed version of a password
 * @param pw plain text password
 */
export const hashPassword = (pw: string): Promise<string> => new Promise((resolve, reject) => {
  bcrypt.hash(pw, SALT_ROUNDS, (err: Error, hash: string) => {
    if (err) {
      reject(err)
      return
    }
    resolve(hash)
  })
})

/**
 * Compare password to a hashed password to find out if they match
 * @param pw plain text password
 * @param hashedPassword hashed version of password
 */
export const verifyPassword = (
  pw: string,
  hashedPassword: string,
): Promise<boolean> => new Promise((resolve, reject) => {
  bcrypt.compare(pw, hashedPassword, function(err: Error, response: boolean) {
    if (err) {
      reject(err)
      return
    }
    resolve(response)
  })
})
