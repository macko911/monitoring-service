import { Router, Handler } from 'express'

import { q, client } from '../../utils/db'
import { asyncMiddleware } from '../../middleware'
import { MonitoredEndpoint } from '../../../shared/models'
import { MonitoredEndpointSchema } from '../../schema'
import { validateSchema } from '../../utils/validation'
import { getMonitor } from './getMonitor'

export const editMonitor: Handler = Router().use(
  getMonitor,
  asyncMiddleware(async (req, res) => {
    const {
      name,
      url,
      monitoredIntervalSeconds,
    } = req.body

    const data: MonitoredEndpoint = res.locals.monitor.data
    if (name !== undefined) {
      data.name = name
    }
    if (url !== undefined) {
      data.url = url
    }
    if (monitoredIntervalSeconds !== undefined) {
      data.monitoredIntervalSeconds = monitoredIntervalSeconds
    }
  
    await validateSchema(MonitoredEndpointSchema, data)
  
    await client.query(
      q.Replace(
        res.locals.monitor.ref,
        {data},
      )
    )

    res.status(204).send()
  })
)
