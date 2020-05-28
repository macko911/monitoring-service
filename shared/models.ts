export type UserId = string

export type User = {
  id: UserId;
  email: string;
  password: string;
  name?: string;
  accessToken?: string;
}

export type MonitoredEndpointId = string

export type MonitoredEndpoint = {
  id: MonitoredEndpointId;
  name: string;
  url: string;
  dateCreated: Date | string;
  dateModified: Date | string;
  monitoredIntervalSeconds: number;
  owner: UserId;
}

export type MonitoringResult = {
  id: string;
  monitorId: MonitoredEndpointId;
  dateCreated: Date | string;
  response: Response;
}

export type Response = {
  statusCode: number;
  contentType: string;
  payload: string;
}

export type QueryResponse<T> = {
  data: Array<T>;
}
