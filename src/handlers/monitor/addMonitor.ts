import { Handler } from 'express'
import { createDocument } from "../../utils/db";
import { asyncMiddleware } from '../../middleware'
import { MonitoredEndpointSchema } from '../../schema'
import { MonitoredEndpoint } from '../../models'
import { validateSchema } from '../../utils/validation'
import { v4 } from 'uuid/';

export const addMonitor: Handler = asyncMiddleware(async (req, res) => {
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
    dateCreated: new Date(),
    dateModified: new Date(),
    owner: res.locals.user.id,
  }
  await validateSchema(MonitoredEndpointSchema, data)
  await createDocument('MonitoredEndpoint', data)
  res.status(204).send()
})
