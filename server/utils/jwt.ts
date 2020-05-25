import {verify, sign} from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

type DecodedObject = {
  data: object;
}

/**
 * Checks if token is valid and not expired, returns decoded token data
 * @param token JWT token
 */
export const verifyToken = (token: string): Promise<object> => new Promise((resolve, reject) => {
  verify(token, SECRET, (err, decoded: DecodedObject) => {
    if (err) {
      reject(err)
      return
    }
    resolve(decoded.data)
  })
})

const SIGN_OPTIONS = {
  // expiresIn: '2d',
}

/**
 * Creates unique JWT token based on supplied data.
 * Token serves us to identify users according to their email address.
 * @param data token data to encrypt
 */
export const createToken = (data: object): Promise<string> => new Promise((resolve, reject) => {
  const payload = {
    data,
  }
  sign(payload, SECRET, SIGN_OPTIONS, (err, encoded) => {
    if (err) {
      reject(err)
      return
    }
    resolve(encoded)
  })
})
