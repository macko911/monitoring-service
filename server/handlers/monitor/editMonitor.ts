import { Router, Handler } from 'express'

import { q, client } from '../../utils/db'
import { asyncMiddleware } from '../../middleware'
import { MonitoredEndpoint } from '../../models'
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
    data.name = name || data.name
    data.url = url || data.url
    data.monitoredIntervalSeconds = monitoredIntervalSeconds || data.monitoredIntervalSeconds
  
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
