import {string, object, number, date} from 'yup'

export const MINIMAL_INTERVAL_SECONDS = 10

export const MonitoredEndpointBaseSchema = object().shape({
  name: string().required(),
  url: string().url().required(),
  monitoredIntervalSeconds: number().min(MINIMAL_INTERVAL_SECONDS).required(),
})

export const MonitoredEndpointComputedSchema = object().shape({
  id: string().required(),
  dateCreated: date().required(),
  dateModified: date().required(),
  owner: string().required(),
})

export const MonitoredEndpointSchema = MonitoredEndpointBaseSchema.concat(
  MonitoredEndpointComputedSchema,
)

const ResponseSchema = object().shape({
  statusCode: number().required(),
  contentType: string().required(),
  payload: object().nullable().default(null),
})

export const MonitoringResultSchema = object().shape({
  id: string().required(),
  monitorId: string().required(),
  dateCreated: date().required(),
  response: ResponseSchema.required(),
})
