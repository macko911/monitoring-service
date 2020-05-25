import { Handler } from 'express'

import { asyncMiddleware } from '../../middleware'
import { listMonitorsByOwner } from '../../utils/monitor'

export const listMonitors: Handler = asyncMiddleware(async (req, res) => {
  const monitors = await listMonitorsByOwner(res.locals.user.id)
  res.send(monitors)
})
