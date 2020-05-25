import { Handler } from 'express';
import { listAllResults } from '../../utils/results';
import { asyncMiddleware } from '../../middleware';

export const listResults: Handler = asyncMiddleware(async (req, res) => {
  const results = await listAllResults()
  res.send(results)
})
