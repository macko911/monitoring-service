import * as yup from 'yup'

export const MonitoredEndpointSchema = yup.object().shape({
  // id: yup.string(),
  name: yup.string().required(),
  url: yup.string().required(),
  dateCreated: yup.string().required(),
  dateModified: yup.string().required(),
  monitoredInterval: yup.number().min(10).required(),
  owner: yup.string().required(),
})
