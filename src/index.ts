import 'dotenv/config'
import express from 'express'

import routes from './routes'
import { errorMiddleware } from './middleware'

const app = express()

app.use(routes)

app.use(errorMiddleware)

app.listen(8080, () => {
  console.log('App listening at http://localhost:8080')
})
