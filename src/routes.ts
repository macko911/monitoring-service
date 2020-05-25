import express from 'express'

import {
  indexPage,
  addMonitor,
  authenticate,
} from './handlers'

const router = express.Router()

router
  .get('/', indexPage)
  .post('/authenticate', authenticate)
  .post('/monitor', addMonitor)

export default router
