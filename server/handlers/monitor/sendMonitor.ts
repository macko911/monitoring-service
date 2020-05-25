import { Router, Handler } from 'express'

import { getMonitor } from './getMonitor'

/**
 * Returns a signle monitor according to supplied monitor ID in request query
 */
export const sendMonitor: Handler = Router().use(
  getMonitor,
  (req, res) => {
    res.send(res.locals.monitor.data)
  }
)
