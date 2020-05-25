import { Handler } from 'express'

export const indexPage: Handler = (req, res) => {
  res.send('Digitoo monitoring service.')
}
