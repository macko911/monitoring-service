import { Router, Handler } from 'express'
import { v4 } from 'uuid'

import { q, client } from '../../utils/db'
import { asyncMiddleware, validationMiddleware } from '../../middleware'
import { MonitoredEndpoint } from '../../../shared/models'
import {
  MonitoredEndpointBaseSchema,
  MonitoredEndpointSchema,
} from '../../schema'
import { validateSchema } from '../../utils/validation'
import { updateMonitor } from '../../utils/checkEndpoints'

/**
 * Create new monitor for logged in user.
 */
export const addMonitor: Handler = Router().use(
  validationMiddleware(null, MonitoredEndpointBaseSchema),
  asyncMiddleware(async (req, res) => {
    const {
      name,
      url,
      monitoredIntervalSeconds,
    } = req.body
  
    const data: MonitoredEndpoint = {
      name,
      url,
      monitoredIntervalSeconds,
      id: v4(),
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      owner: res.locals.user.id,
    }
  
    await validateSchema(MonitoredEndpointSchema, data)
  
    await client.query(
      q.Create(
        q.Collection('MonitoredEndpoint'),
        {data},
      )
    )

    updateMonitor(data)

    res.send(data.id)
  })
)
