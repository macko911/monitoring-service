import {State} from './reducers'

export const isLoggedIn = (state: State) => state.auth.accessToken !== null

export const getLoggedUser = (state: State) => state.auth

export const getAccessToken = (state: State) => state.auth.accessToken

export const getMonitors = (state: State) => state.monitors

export const getMonitor = (state: State, id: string) => getMonitors(state)
  .find((monitor) => monitor.id === id)
