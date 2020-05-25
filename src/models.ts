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
  monitoredInterval: number;
  owner: UserId;
}

export interface MonitoringResult {
  id: number;
  endpointId: MonitoredEndpointId;
  dateCreated: Date;
  response: Response;
}

export type Response = {
  statusCode: number;
  payload: any;
}
