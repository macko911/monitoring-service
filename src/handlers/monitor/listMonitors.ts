import { Handler } from 'express'
import { asyncMiddleware } from '../../middleware'
import { q, client } from '../../utils/db'
import { MonitoredEndpoint } from '../../models'

type ResponseObject = {
  data: MonitoredEndpoint;
}

type QueryResponse = {
  data: ResponseObject[];
}

export const listMonitors: Handler = asyncMiddleware(async (req, res) => {
  const result: QueryResponse = await client.query(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index('MonitoredEndpoint_by_owner'),
          res.locals.user.id,
        ),
      ),
      q.Lambda(
        'MonitoredEndpoint',
        q.Get(q.Var('MonitoredEndpoint'))
      )
    )
  )
  const monitors = result.data.map((monitor) => monitor.data)
  res.send(monitors)
})
