export type User = {
  id?: string;
  email: string;
  password?: string;
  name?: string;
  accessToken?: string;
}

export type MonitoredEndpoint = {
  id: string;
  name: string;
  url: string;
  dateCreated: Date | string;
  dateModified: Date | string;
  monitoredIntervalSeconds: number;
  owner: User['id'];
}

export type MonitoringResult = {
  id: string;
  monitorId: MonitoredEndpoint['id'];
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
