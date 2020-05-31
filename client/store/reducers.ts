import {combineReducers} from 'redux'
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  MONITORS_LIST,
  MONITORS_ADD,
} from './actions'
import {
  MonitoredEndpoint,
  AuthState,
} from '../../shared/models'

const initAuth: AuthState = {
  accessToken: null,
  email: null,
  name: null,
}

export const auth = (state = initAuth, {type, payload}) => {
  switch (type) {
    case AUTH_LOGIN:
      return {
        ...state,
        accessToken: payload.accessToken,
        email: payload.email,
        name: payload.name,
      }

    case AUTH_LOGOUT:
      return initAuth

    default:
      return state
  }
}

const EMPTY_MONITOR = {
  id: 'new',
  url: '',
  name: 'New monitored url',
  monitoredIntervalSeconds: 60,
}

export const monitors = (state = [], {type, payload}) => {
  switch (type) {
    case MONITORS_LIST: {
      return payload.monitors
    }

    case MONITORS_ADD: {
      return [...state, {...EMPTY_MONITOR}]
    }

    case AUTH_LOGOUT: {
      return []
    }

    default:
      return state
  }
}

export type State = {
  auth: AuthState,
  monitors: MonitoredEndpoint[],
}

export const reducers = combineReducers({
  auth,
  monitors,
})
