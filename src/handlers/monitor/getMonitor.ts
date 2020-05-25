import { Router, Handler } from 'express'
import { asyncMiddleware, validationMiddleware } from '../../middleware'
import { q, client } from '../../utils/db'
import { MonitoredEndpoint } from '../../models'
import { object, string } from 'yup'

type ResponseObject = {
  data: MonitoredEndpoint;
}

type QueryResponse = {
  data: ResponseObject[];
}

const querySchema = object().shape({
  id: string().required(),
})

export const getMonitor: Handler = Router().use(
  validationMiddleware(querySchema),
  asyncMiddleware(async (req, res) => {
    const {id} = req.query
    const result: QueryResponse = await client.query(
      q.Get(
        q.Match(
          q.Index('MonitoredEndpoint_by_id'),
          id,
        ),
      ),
    )
    if (!result) {
      res
        .status(404)
        .send({
          msg: `Monitored endpoint with id "${id}" not found.`
        })
    }
    res.send(result.data)
  })
)
