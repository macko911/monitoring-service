import { object, string, number } from 'yup'
import { Router, Handler } from 'express'
import { v4 } from 'uuid'

import { q, client } from "../../utils/db"
import { asyncMiddleware, validationMiddleware } from '../../middleware'
import { MonitoredEndpoint } from '../../models'
import {
  MonitoredEndpointBaseSchema,
  MonitoredEndpointSchema,
} from '../../schema'
import { validateSchema } from '../../utils/validation'

export const addMonitor: Handler = Router().use(
  validationMiddleware(null, MonitoredEndpointBaseSchema),
  asyncMiddleware(async (req, res) => {
    const {
      name,
      url,
      monitoredInterval,
    } = req.body
  
    const data: MonitoredEndpoint = {
      name,
      url,
      monitoredInterval,
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

    res.status(204).send()
  })
)
