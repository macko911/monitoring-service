import { MonitoredEndpoint } from "../models"

export const serialize = (monitor: MonitoredEndpoint) => {
  const serialized = {
    ...monitor,
    dateCreated: typeof monitor.dateCreated === 'string' ? monitor.dateCreated : monitor.dateCreated.toISOString(),
    dateModified: monitor.dateModified.toISOString(),
  }
  return serialized
}

export const deserialize = (monitor: MonitoredEndpoint) => {
  const serialized = {
    ...monitor,
    dateCreated: monitor.dateCreated.toISOString(),
    dateModified: monitor.dateModified.toISOString(),
  }
  return serialized
}
