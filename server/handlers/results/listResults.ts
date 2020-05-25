import { object, string } from 'yup'
import { Router } from 'express'

import { listResultsByMonitorId } from '../../utils/results'
import { asyncMiddleware, validationMiddleware } from '../../middleware'

const querySchema = object().shape({
  monitorId: string().required(),
})

/**
 * List results related to a single endpoint monitor.
 */
export const listResults = Router().use(
  validationMiddleware(querySchema),
  asyncMiddleware(async (req, res) => {
    const monitorId = req.query.monitorId as string
    const results = await listResultsByMonitorId(monitorId)
    res.send(results)
  })
)
