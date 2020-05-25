import { Router, Handler } from 'express'

import { getMonitor } from './getMonitor'
import { client, q } from '../../utils/db'
import { asyncMiddleware } from '../../middleware'
import { deleteResultsByMonitorId } from '../../utils/results'
import { MonitoredEndpoint } from '../../../shared/models'
import { updateMonitor } from '../../utils/checkEndpoints'

/**
 * Deletes monitor from database according to monitor ID
 */
export const deleteMonitor: Handler = Router().use(
  getMonitor,
  asyncMiddleware(async (req, res) => {
    try {
      const ref = res.locals.monitor.ref
      // delete monitored endpoint
      await client.query(
        q.Delete(ref)
      )
      const monitor = res.locals.monitor.data as MonitoredEndpoint
      // delete all results associated with monitored endpoint
      await deleteResultsByMonitorId(monitor.id)
      updateMonitor(monitor)
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
