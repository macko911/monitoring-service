import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'
import {
  Box,
  Button,
} from 'grommet'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import {State} from '../store/reducers'

import {isLoggedIn, getMonitors, getMonitor} from '../store/selectors'
import {listMonitors, addMonitor} from '../store/actions'

const Wrap = styled(Box)`
  width: 100%;
  max-width: 300px;
  border-right: 1px solid rgb(240, 240, 240);
  flex: 1 0;
`

const MonitorName = styled.span`
  display: block;
  text-decoration: none;
  ${props => props.selected ? 'font-weight: bold;' : ''}
  &:hover {
    color: darkblue;
  }
`

const MonitorUrl = styled.span`
  font-style: italic;
  color: #808080;
`

const Monitor = styled.a`
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 250px;
`

const Sidebar = ({
  dispatch,
  loggedIn,
  monitors,
  canAddMonitor,
}) => {
  React.useEffect(() => {
    if (loggedIn) {
      dispatch(listMonitors())
    }
  }, [loggedIn])
  const {query, push} = useRouter()

  if (!loggedIn) {
    return null
  }

  function handleAddMonitor () {
    dispatch(addMonitor())
    push('/monitor/[monitorId]', '/monitor/new')
  }

  return (
    <Wrap pad="small">
      <strong>Monitored Urls</strong>
      <Box pad="small" />

      {monitors.length === 0 && (
        <i>
          No monitored urls...
        </i>
      )}

      {monitors.map((monitor) => {
        return (
          <Link
            key={monitor.id}
            as={`/monitor/${monitor.id}`}
            href="/monitor/[monitorId]"
          >
            <Monitor>
              <MonitorName selected={query.monitorId === monitor.id}>
                {monitor.name}
              </MonitorName>
              <MonitorUrl>
                {monitor.url}
              </MonitorUrl>
            </Monitor>
          </Link>
        )
      })}

      <Box pad="small" />

      {canAddMonitor && (
        <Button
          onClick={handleAddMonitor}
          label="Add monitor"
        />
      )}
    </Wrap>
  )
}

Sidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  monitors: PropTypes.array.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  canAddMonitor: PropTypes.bool.isRequired,
}

const mapStateToProps = (state: State) => ({
  loggedIn: isLoggedIn(state),
  monitors: getMonitors(state),
  canAddMonitor: getMonitor(state, 'new') === undefined,
})

export default connect(mapStateToProps)(Sidebar)
