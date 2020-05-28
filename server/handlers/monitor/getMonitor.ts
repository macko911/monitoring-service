import {Router, Handler} from 'express'
import {object, string} from 'yup'

import {
  asyncMiddleware,
  validationMiddleware,
} from '../../middleware'
import {q, client} from '../../utils/db'
import {MonitoredEndpoint} from '../../../shared/models'

type QueryObject = {
  data: MonitoredEndpoint;
}

const querySchema = object().shape({
  id: string().required(),
})

export const getMonitor: Handler = Router().use(
  validationMiddleware(querySchema),
  asyncMiddleware(async (req, res, next) => {
    const {id} = req.query
    try {
      const result: QueryObject = await client.query(
        q.Get(
          q.Match(
            q.Index('MonitoredEndpoint_by_id'),
            id,
          ),
        ),
      )
      res.locals.monitor = result
      next()
    } catch (err) {
      console.error(err)
      res
        .status(404)
        .send({
          msg: `Failed to fetch monitor with id ${id}. ${err.message}`,
        })
      return
    }
  }),
)
