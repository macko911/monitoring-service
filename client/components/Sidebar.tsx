import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'
import {
  Box,
  Button,
} from 'grommet'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { State } from '../store/reducers'

import { isLoggedIn, getMonitors } from '../store/selectors'
import { listMonitors, addMonitor } from '../store/actions'

const Wrap = styled(Box)`
  width: 100%;
  max-width: 300px;
  border-right: 1px solid rgb(240, 240, 240);
  flex: 1 0;
`

const MonitorName = styled.a`
  cursor: pointer;
  text-decoration: none;
  ${props => props.selected ? 'font-weight: bold;' : ''}
  &:hover {
    color: darkblue;
  }
`

const Sidebar = ({
  dispatch,
  loggedIn,
  monitors,
}) => {
  React.useEffect(() => {
    if (loggedIn) {
      dispatch(listMonitors())
    }
  }, [loggedIn])
  const {query} = useRouter()

  if (!loggedIn) {
    return null
  }

  return (
    <Wrap pad="small">
      <strong>Monitored Urls</strong>
      <Box pad="small" />
      {monitors.map((monitor) => {
        return (
          <Link
            key={monitor.id}
            as={`/monitor/${monitor.id}`}
            href="/monitor/[monitorId]"
          >
            <MonitorName selected={query.monitorId === monitor.id}>
              {monitor.name}
            </MonitorName>
          </Link>
        )
      })}

      <Box pad="small" />

      <Button
        onClick={() => dispatch(addMonitor())}
        label="Add monitor"
      />
    </Wrap>
  )
}

Sidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  monitors: PropTypes.array.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = (state: State) => ({
  loggedIn: isLoggedIn(state),
  monitors: getMonitors(state),
})

export default connect(mapStateToProps)(Sidebar)
