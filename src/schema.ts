import { string, object, number, date } from 'yup'

export const MonitoredEndpointBaseSchema = object().shape({
  name: string().required(),
  url: string().required(),
  monitoredInterval: number().min(10).required(),
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
