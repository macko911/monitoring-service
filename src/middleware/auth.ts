import { asyncMiddleware } from './async'
import { verifyToken } from '../utils/jwt'
import { getUserByEmail } from '../utils/user'
import { unauthorized } from '../utils/auth'

export const authMiddleware = asyncMiddleware(async (req, res, next) => {
  // check for Bearer "authToken"
  const authHeader = req.get('Authorization') || ''
  const [type, authToken] = authHeader.split(' ')
  if (type !== 'Bearer') {
    unauthorized(res)
    return
  }
  try {
    const {email} = await verifyToken(authToken) as {email: string}
    const user = await getUserByEmail(email)
    res.locals.user = user
    next()
  } catch (err) {
    console.error(err)
    unauthorized(res)
  }
})
