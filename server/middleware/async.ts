import { Handler } from 'express'

/**
 * Allows Express middleware to be an async function
 * @param handler wrapped middleware function
 */
export const asyncMiddleware = (handler: Handler): Handler => (req, res, next) =>
  Promise
    .resolve(handler(req, res, next))
    .catch(next)
