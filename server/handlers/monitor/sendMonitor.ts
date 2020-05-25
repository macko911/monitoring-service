import { Router, Handler } from 'express'

import { getMonitor } from './getMonitor'

export const sendMonitor: Handler = Router().use(
  getMonitor,
  (req, res) => {
    res.send(res.locals.monitor.data)
  }
)
