import { Handler } from 'express'

const indexPage: Handler = (req, res) => {
  res.send('Digitoo monitoring service.')
}

export default indexPage
