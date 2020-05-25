export type UserId = number

export type User = {
  id: UserId;
  name: string;
  email: string;
  password: string;
  accessToken: string;
}

export type MonitoredEndpointId = number

export type MonitoredEndpoint = {
  id: MonitoredEndpointId;
  name: string;
  url: string;
  dateCreated: Date;
  dateModified: Date;
  monitoredInterval: number;
  owner: UserId;
}

export type MonitoringResult = {
  id: number;
  endpointId: MonitoredEndpointId;
  dateCreated: Date;
  response: Response;
}

export type Response = {
  statusCode: number;
  payload: any;
}
