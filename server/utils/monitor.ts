import { v4 } from 'uuid'
import { client, q } from './db'
import {
  MonitoredEndpoint,
  MonitoringResult,
  Response,
  QueryResponse,
} from '../../shared/models'
import { validateSchema } from './validation'
import { MonitoringResultSchema } from '../schema'

type QueryObject = {
  data: MonitoredEndpoint;
}

/**
 * Lists all monitors from all users in the database
 */
export async function listAllMonitors () {
  const result: QueryResponse<QueryObject> = await client.query(
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

/**
 * Returns list of monitors owned by an authenticated user
 * @param owner user id of monitor owner
 */
export async function listMonitorsByOwner (owner: string) {
  const result: QueryResponse<QueryObject> = await client.query(
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

/**
 * Store monitoring result to database 
 * @param monitorId id of monitor related to the request response
 * @param response details of the request response
 */
export async function saveMonitoringResult (
  monitorId: string,
  response: Response,
) {
  const data: MonitoringResult = {
    id: v4(),
    dateCreated: new Date().toISOString(),
    monitorId,
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
