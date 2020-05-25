import { Handler } from 'express'
import { deleteAllResults } from '../../utils/results'
import { asyncMiddleware } from '../../middleware'

/**
 * Removes all results from database
 */
export const clearResults: Handler = asyncMiddleware(async (req, res) => {
  await deleteAllResults()
  res
    .status(204)
    .send()
})
