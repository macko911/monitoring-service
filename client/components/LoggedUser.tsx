import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {State} from '../store/reducers'
import {getLoggedUser} from '../store/selectors'

const Wrap = styled.div`

`

const shortenEmail = (mail: string) => mail.slice(0, mail.indexOf('@'))

const LoggedUser = ({email, name}) => {
  if (!email) {
    return null
  }
  return (
    <Wrap>
      {name || shortenEmail(email)}
    </Wrap>
  )
}

LoggedUser.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}

const mapStateToProps = (state: State) => getLoggedUser(state)

export default connect(mapStateToProps)(LoggedUser)
