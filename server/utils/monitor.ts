import { v4 } from 'uuid'
import { client, q } from './db'
import {
  MonitoredEndpoint,
  MonitoringResult,
  Response,
} from '../models'
import { validateSchema } from './validation'
import { MonitoringResultSchema } from '../schema'

type QueryObject = {
  data: MonitoredEndpoint;
}

type QueryResponse = {
  data: QueryObject[];
}

export async function listAllMonitors () {
  const result: QueryResponse = await client.query(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index('MonitoredEndpoint'),
        ),
        { size: 100000 },
      ),
      q.Lambda('x', q.Get(q.Var('x'))),
    ),
  )
  return result.data.map((monitor) => monitor.data)
}

export async function listMonitorsByOwner (owner: string) {
  const result: QueryResponse = await client.query(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index('MonitoredEndpoint_by_owner'),
          owner,
        ),
      ),
      q.Lambda('x', q.Get(q.Var('x'))),
    ),
  )
  return result.data.map((monitor) => monitor.data)
}

export async function saveMonitoringResult (endpointId: string, response: Response) {
  const data: MonitoringResult = {
    id: v4(),
    dateCreated: new Date().toISOString(),
    endpointId,
    response,
  }
  await validateSchema(MonitoringResultSchema, data)
  await client.query(
    q.Create(
      q.Collection('MonitoringResult'),
      {data},
    )
  )
}
