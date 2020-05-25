export type UserId = string

export type User = {
  id: UserId;
  name: string;
  email: string;
  password: string;
  accessToken: string;
}

export type MonitoredEndpointId = string

export interface MonitoredEndpoint {
  id: MonitoredEndpointId;
  name: string;
  url: string;
  dateCreated: Date | string;
  dateModified: Date | string;
  monitoredIntervalSeconds: number;
  owner: UserId;
}

export interface MonitoringResult {
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
