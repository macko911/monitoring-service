import { Handler } from 'express';
import { asyncMiddleware } from './async';
import { Schema, ValidationError } from 'yup';

export const validationMiddleware = (querySchema?: Schema<object>, bodySchema?: Schema<object>): Handler =>
  asyncMiddleware(async (req, res, next) => {
    function badRequest (err: ValidationError) {
      res
        .status(400)
        .send({
          msg: `ValidationError: ${err.message}`,
        })
    }
    if (querySchema) {
      try {
        await querySchema.validate(req.query)
      } catch (err) {
        badRequest(err)
        return
      }
    }
    if (bodySchema) {
      try {
        await bodySchema.validate(req.body)
      } catch (err) {
        badRequest(err)
        return
      }
    }
    next()
  })
