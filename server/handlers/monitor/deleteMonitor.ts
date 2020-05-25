import { Router, Handler } from 'express'

import { getMonitor } from './getMonitor'
import { client, q } from '../../utils/db'
import { asyncMiddleware } from '../../middleware'
import { deleteResultsByMonitorId } from '../../utils/results'

export const deleteMonitor: Handler = Router().use(
  getMonitor,
  asyncMiddleware(async (req, res) => {
    try {
      const {monitor} = res.locals
      // delete monitored endpoint
      await client.query(
        q.Delete(monitor.ref)
      )
      // delete all results associated with monitored endpoint
      await deleteResultsByMonitorId(monitor.data.id)
      res.status(204).send()
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .send({
          msg: `Failed to delete monitor with id ${req.query.id}: ${err.messsage}`,
        })
    }
  })
)
