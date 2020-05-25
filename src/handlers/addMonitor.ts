import { Handler } from 'express'
import { createDocument } from "../utils/db";

const addMonitor: Handler = (req, res) => {
  createDocument('MonitoredEndpoint', {
    testField: true,
  }).then(() => {
    res.status(204).send()
  })
}

export default addMonitor
