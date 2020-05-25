import {verify, sign} from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

type DecodedObject = {
  data: object;
}

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
