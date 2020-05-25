import { Handler } from 'express'
import { asyncMiddleware } from './async'
import { Schema, ValidationError } from 'yup'

/**
 * Validates request query/body parameters against a yup schema.
 * Throws validation error if schema doesn't match the parameters.
 * @param querySchema object schema for request query parameters
 * @param bodySchema object schema for request body
 */
export const validationMiddleware = (querySchema?: Schema<object>, bodySchema?: Schema<object>): Handler =>
  asyncMiddleware(async (req, res, next) => {
    function badRequest (type: 'Query' | 'Body', err: ValidationError) {
      res
        .status(400)
        .send({
          msg: `${type}ValidationError: ${err.message}`,
        })
    }
    if (querySchema) {
      try {
        await querySchema.validate(req.query)
      } catch (err) {
        badRequest('Query', err)
        return
      }
    }
    if (bodySchema) {
      try {
        await bodySchema.validate(req.body)
      } catch (err) {
        badRequest('Body', err)
        return
      }
    }
    next()
  })
