import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import routes from './routes'
import { errorMiddleware } from './middleware'
import { checkEndpoints } from './utils/checkEndpoints'

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.use(routes)

app.use(errorMiddleware)

app.listen(8080, () => {
  checkEndpoints()
  console.log('Backend app listening at http://localhost:8080')
})

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})
