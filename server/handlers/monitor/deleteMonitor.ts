import { Router, Handler } from 'express'

import { getMonitor } from './getMonitor'
import { client, q } from '../../utils/db'
import { asyncMiddleware } from '../../middleware'

export const deleteMonitor: Handler = Router().use(
  getMonitor,
  asyncMiddleware(async (req, res) => {
    try {
      await client.query(
        q.Delete(res.locals.monitor.ref)
      )
      res.status(204).send()
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .send({
          msg: `Failed to delete monitor with id ${req.query.id}: ${err.messsage}`
        })
    }
  })
)
