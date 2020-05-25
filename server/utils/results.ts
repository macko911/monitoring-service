import { client, q } from './db'
import { MonitoringResult } from '../../shared/models'

type QueryObject = {
  data: MonitoringResult;
}

type QueryResponse = {
  data: QueryObject[];
}

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

export async function deleteAllResults () {
  await getResults('MonitoringResult', q.Delete)
}

export async function deleteResultsByMonitorId (monitorId: string) {
  await getResults(
    'MonitoringResult',
    q.Delete,
    monitorId,
  )
}

export async function listResultsByMonitorId (monitorId: string) {
  const result = await getResults(
    'MonitoringResult_by_monitorId',
    q.Get,
    monitorId,
    10,
  ) as QueryResponse
  
  return result.data
    .map((monitor) => monitor.data)
}
