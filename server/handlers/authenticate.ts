import basicAuth from 'basic-auth'
import {getUserByEmail} from '../utils/user'
import {asyncMiddleware} from '../middleware'
import {createToken} from '../utils/jwt'
import {unauthorized, verifyPassword} from '../utils/auth'

/**
 * Checks username/password sent as Basic Authorization header and returns
 * JWT access token.
 */
export const authenticate = asyncMiddleware(async (req, res) => {
  const {name, pass} = basicAuth(req) || {}

  if (!name || !pass) {
    res.set('WWW-Authenticate', 'Basic')
    return unauthorized(res)
  }
  
  // get user password
  const user = await getUserByEmail(name)

  // compare with database
  if (!user || !user.password || !(await verifyPassword(pass, user.password))) {
    return unauthorized(res)
  }

  const accessToken = await createToken({email: user.email})

  res.send({
    name: user.name,
    email: user.email,
    accessToken,
  })
})
