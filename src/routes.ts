import express from 'express'

import {
  indexPage,
  addMonitor,
  authenticate,
  
  listMonitors,
  deleteMonitor,
  sendMonitor,
  editMonitor,

  clearResults,
  listResults,
} from './handlers'

import { authMiddleware } from "./middleware"

const router = express.Router()

router
  .get('/', indexPage)
  .post('/authenticate', authenticate)
  .use('/results', authMiddleware, router
    .get('/list', listResults)
    .delete('/', clearResults)
  )
  .use('/monitor', authMiddleware, router
    .get('/', sendMonitor)
    .post('/', addMonitor)
    .put('/', editMonitor)
    .delete('/', deleteMonitor)
    .get('/list', listMonitors)
  )

export default router
