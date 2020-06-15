import {Router, Handler} from 'express'
import {string, object} from 'yup'

import {client, q} from '../utils/db'
import {getUserById, UserResponse} from '../utils/user'
import {asyncMiddleware, validationMiddleware} from '../middleware'

const querySchema = object().shape({
  userId: string().required(),
})

type Data = {
  active: boolean;
}

type Ref = UserResponse['ref']

async function getCurrentState (ref: Ref) {
  try {
    const res = await client.query<{data: Data}>(
      q.Get(ref),
    )
    return res.data
  } catch (err) {
    return null
  }
}

const getMonitoringState = Router().use(
  validationMiddleware(querySchema),
  asyncMiddleware(async (req, res) => {
    const userId = req.query.userId as string

    // check that user with id exists 
    const user = await getUserById(userId)
    if (!user) {
      res.status(404)
      throw Error('User not found.')
    }

    // create ref of user's monitoring state
    const ref = q.Ref(
      q.Collection('MonitoringState'),
      user.ref.id,
    )

    // check if document already exists
    const state = await getCurrentState(ref)

    res.locals.state = state
    res.locals.ref = ref
  }),
)

/**
 * Deletes monitor from database according to monitor ID
 */
export const editMonitoring = (active: boolean): Handler => Router().use(
  getMonitoringState,
  asyncMiddleware(async (req, res) => {
    const state: Data = res.locals.state
    const ref: Ref = res.locals.ref

    // defined new monitoring state
    const data: Data = {
      active,
    }

    // update or create state
    if (state) {
      if (state.active === active) {
        res
          .status(304)
          .send()
        return
      }
      await client.query(
        q.Update(ref, {data}),
      )
    } else {
      await client.query(
        q.Create(ref, {data}),
      )
    }

    res
      .status(204)
      .send()
  }),
)

export const startMonitoring = editMonitoring(true)

export const stopMonitoring = editMonitoring(false)

export const getMonitoring = Router().use(
  getMonitoringState,
  asyncMiddleware(async (req, res) => {
    res.send(res.locals.state)
  }),
)
