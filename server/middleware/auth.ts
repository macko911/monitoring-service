import { asyncMiddleware } from './async'
import { verifyToken } from '../utils/jwt'
import { getUserByEmail } from '../utils/user'
import { unauthorized } from '../utils/auth'

/**
 * Middleware to authenticate user according to access token before
 * accessing secured endpoints.
 */
export const authMiddleware = asyncMiddleware(async (req, res, next) => {
  // check for Bearer "accessToken"
  const authHeader = req.get('Authorization') || ''
  const [type, accessToken] = authHeader.split(' ')
  if (type !== 'Bearer') {
    unauthorized(res)
    return
  }
  try {
    const {email} = await verifyToken(accessToken) as {email: string}
    const user = await getUserByEmail(email)
    res.locals.user = user
    next()
  } catch (err) {
    console.error(err)
    unauthorized(res)
  }
})
