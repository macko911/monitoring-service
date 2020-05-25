import fetch from 'cross-fetch'
import ms from 'ms'

import { listAllMonitors, saveMonitoringResult } from './monitor'
import { MonitoredEndpoint, Response } from '../../shared/models'
import { MINIMAL_INTERVAL_SECONDS } from '../schema'

// keep track of all checked intervals
const monitors = {}

export function updateMonitor (monitor: MonitoredEndpoint) {
  const {
    monitoredIntervalSeconds,
    id,
  } = monitor
  // check that we don't overload the server with too many requests
  if (!monitoredIntervalSeconds || monitoredIntervalSeconds < MINIMAL_INTERVAL_SECONDS) {
    return
  }
  // remove old interval if there was one already set up
  if (monitors[id]) {
    clearInterval(monitors[id])
  }
  monitors[id] = setInterval(() => checkEndpoint(monitor), ms(`${monitoredIntervalSeconds}s`))
}

async function checkEndpoint (monitor: MonitoredEndpoint) {
  const {
    id,
    url,
    name,
  } = monitor
  console.log(`Checking endpoint ${name}, url: ${url}`)
  const res = await fetch(url)
  const response: Response = {
    statusCode: res.status,
    contentType: res.headers.get('content-type'),
    payload: await res.text(),
  }
  await saveMonitoringResult(id, response)
}

export const checkEndpoints = async () => {
  return
  console.log('Start monitoring urls...')
  // fetch all monitored endpoints
  const allMonitors = await listAllMonitors()
  if (!allMonitors.length) {
    console.log('No monitors set up yet...')
  }
  // run interval for each monitor
  allMonitors.forEach(updateMonitor)
}
