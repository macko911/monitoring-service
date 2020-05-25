import compare from 'tsscmp'
import basicAuth from 'basic-auth'
import { getUserByEmail } from '../utils/user'
import { asyncMiddleware } from '../middleware'
import { createToken } from '../utils/jwt'
import { unauthorized } from '../utils/auth'

export const authenticate = asyncMiddleware(async (req, res, next) => {
  const {name, pass} = basicAuth(req) || {}

  if (!name || !pass) {
    res.set('WWW-Authenticate', 'Basic')
    return unauthorized(res)
  }
  
  // get user password
  const user = await getUserByEmail(name)

  // compare with database
  if (!user || !user.password || !compare(user.password, pass)) {
    return unauthorized(res)
  }

  const accessToken = await createToken({email: user.email})

  res.send(accessToken)
})
