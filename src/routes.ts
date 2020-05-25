import express from 'express'

import {
  indexPage,
  addMonitor,
  listMonitors,
  authenticate,
} from './handlers'

import { authMiddleware } from "./middleware"

const router = express.Router()

router
  .get('/', indexPage)
  .post('/authenticate', authenticate)
  .use('/monitor', authMiddleware, express.Router()
    // .get('/', getMonitor)
    .post('/', addMonitor)
    // .put('/', editMonitor)
    .get('/list', listMonitors)
  )

export default router
