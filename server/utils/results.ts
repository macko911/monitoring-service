import { client, q } from './db'
import { MonitoringResult } from '../../shared/models'
import { QueryResponse } from '../../shared/models'

type QueryObject = {
  data: MonitoringResult;
}

/**
 * Searches database for results and executes an operation on each result
 * such as q.Get or q.Delete
 * @param index name of database index to query
 * @param operation FaunaDb operation executed on each query result
 * @param match narrow down results that match string
 * @param size number of results to fetch
 */
async function getResults (
  index: string,
  operation: (arg0: any) => any,
  match?: string,
  size = 100000,
) {
  return client.query(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index(index),
          match,
        ),
        { size },
      ),
      q.Lambda('x', operation(q.Var('x'))),
    ),
  )
}

/**
 * Deletes all results from database
 */
export async function deleteAllResults () {
  await getResults('MonitoringResult', q.Delete)
}

/**
 * Deletes all results from database which are related to a monitor
 * @param monitorId monitor id
 */
export async function deleteResultsByMonitorId (monitorId: string) {
  await getResults(
    'MonitoringResult',
    q.Delete,
    monitorId,
  )
}

/**
 * Returns top 10 results related to a monitor
 * @param monitorId monitor id
 */
export async function listResultsByMonitorId (monitorId: string) {
  const result = await getResults(
    'MonitoringResult_by_monitorId',
    q.Get,
    monitorId,
    10,
  ) as QueryResponse<QueryObject>
  
  return result.data
    .map((monitor) => monitor.data)
}
