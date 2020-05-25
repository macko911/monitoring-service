import compare from 'tsscmp'
import basicAuth from 'basic-auth'
import { Response } from 'express'
import { getUser } from '../utils/user'
import { asyncMiddleware } from '../middleware'

function forbidAccess (res: Response) {
  res
    .status(401)
    .json({
      msg: 'You are not allowed access to this endpoint.',
    })
}

const authenticate = asyncMiddleware(async (req, res, next) => {
  const {name, pass} = basicAuth(req) || {}

  if (!name || !pass) {
    res.set('WWW-Authenticate', 'Basic')
    return forbidAccess(res)
  }
  
  // get user password
  const user = await getUser(name)

  // compare with database
  if (!user || !user.password || !compare(user.password, pass)) {
    return forbidAccess(res)
  }

  res.send(user.accessToken)
})

export default authenticate
