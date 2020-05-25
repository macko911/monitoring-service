import { State } from './reducers'

export const isLoggedIn = (state: State) => state.auth.accessToken !== null
