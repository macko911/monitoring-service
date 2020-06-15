import express from 'express'

import {
  indexPage,
  addMonitor,
  authenticate,
  signUp,
  
  listMonitors,
  deleteMonitor,
  sendMonitor,
  editMonitor,

  clearResults,
  listResults,

  getMonitoring,
  startMonitoring,
  stopMonitoring,
} from './handlers'

import {authMiddleware} from './middleware'

const router = express.Router()

router
  .get('/', indexPage)
  .post('/login', authenticate)
  .post('/signup', signUp)
  .use('/results', authMiddleware, express.Router()
    .get('/', listResults)
    .delete('/', clearResults),
  )
  .use('/monitor', authMiddleware, express.Router()
    .get('/', sendMonitor)
    .post('/', addMonitor)
    .put('/', editMonitor)
    .delete('/', deleteMonitor)
    .get('/list', listMonitors),
  )
  .use('/monitoring', authMiddleware, express.Router()
    .get('/', getMonitoring)
    .post('/start', startMonitoring)
    .post('/stop', stopMonitoring),
  )

export default router
