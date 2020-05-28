import {Handler, Router} from 'express'
import {asyncMiddleware, validationMiddleware} from '../middleware'
import {object, string} from 'yup'
import {client, q} from '../utils/db'
import {User, QueryResponse} from '../../shared/models'
import {v4} from 'uuid'
import {hashPassword} from '../utils/auth'
import {createToken} from '../utils/jwt'

const bodySchema = object().shape({
  email: string().email().required(),
  password: string().required(),
})

export const signUp: Handler = Router().use(
  validationMiddleware(null, bodySchema),
  asyncMiddleware(async (req, res) => {
    const email: string = req.body.email
    const password: string = req.body.password

    const data: User = {
      id: v4(),
      email,
      password: await hashPassword(password),
    }

    // check if user exists
    const result: QueryResponse<User> = await client.query(
      q.Paginate(
        q.Match(
          q.Index('User_by_email'),
          email,
        ),
      ),
    )
    if (result.data[0]) {
      res.status(409)
      throw Error(`User with email "${email}" alraedy exists.`)
    }

    // create user
    await client.query(
      q.Create(
        q.Collection('User'),
        {data},
      ),
    )

    const accessToken = await createToken({email})

    res.send({
      accessToken,
    })
  }),
)
