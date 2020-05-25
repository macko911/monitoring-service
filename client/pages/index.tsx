import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { connect } from 'react-redux'
import { State } from '../store/reducers'

import { isLoggedIn } from '../store/selectors'

const IndexPage = ({
  loggedIn,
}) => {
  if (!loggedIn) {
    return (
      <div>
        Welcome! Please <Link href='/login'><a>login</a></Link> first...
      </div>
    )
  }
  return null
}

IndexPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state: State) => ({
  loggedIn: isLoggedIn(state),
})

export default connect(mapStateToProps)(IndexPage)

