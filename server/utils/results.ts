import { client, q } from './db'
import { MonitoringResult } from '../../shared/models'

type QueryObject = {
  data: MonitoringResult;
}

type QueryResponse = {
  data: QueryObject[];
}

async function applyOnAllResults (fn: any) {
  return client.query(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index('MonitoringResult'),
        ),
        { size: 100000 },
      ),
      q.Lambda('x', fn(q.Var('x'))),
    ),
  )
}

export async function deleteAllResults () {
  await applyOnAllResults(q.Delete)
}

export async function listAllResults () {
  const result = await applyOnAllResults(q.Get) as QueryResponse
  return result.data.map((monitor) => monitor.data)
}
