import React, { FormEvent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { compose } from 'redux'
import { connect } from 'react-redux'

import * as api from '../../api'
import { listMonitors } from '../../store/actions'
import { getMonitor } from '../../store/selectors'
import { State } from '../../store/reducers'
import {
  FormField,
  TextInput,
  Button,
  Box,
  Heading,
} from 'grommet'

const Wrap = styled.div`
  max-width: 500px;
`

const MonitorDetailPage = ({
  detail,
  dispatch,
}) => { 
  if (!detail) {
    return null
  }
  const {
    name,
    url,
    monitoredIntervalSeconds,
  } = detail

  const [newDetail, setNewDetail] = React.useState(detail)
  React.useEffect(() => {
    setNewDetail(detail)
  }, [name, url, monitoredIntervalSeconds])

  const editDetail = (param, type = 'string') => (e: FormEvent) => {
    let newValue = e.currentTarget.value
    if (type === 'number') {
      newValue = parseInt(newValue) || 0
    }
    setNewDetail((oldDetail) => ({
      ...oldDetail,
      [param]: newValue,
    }))
  }

  async function saveMonitor () {
    await api.saveMonitor(newDetail)
    alert('Monitor saved!')
  }

  async function deleteMonitor () {
    await api.deleteMonitor(detail.id)
    alert('Monitor deleted!')
    dispatch(listMonitors())
  }

  return (
    <Wrap>
      <Heading level={3} as="div">Monitor detail</Heading>

      <Box pad="small" />

      <FormField label="Name">
        <TextInput
          placeholder="Name"
          value={newDetail.name}
          onChange={editDetail('name')}
        />
      </FormField>

      <FormField label="Url">
        <TextInput
          placeholder="Url"
          value={newDetail.url}
          onChange={editDetail('url')}
        />
      </FormField>

      <FormField label="Monitoring Interval">
        <TextInput
          placeholder="Monitoring Interval"
          value={newDetail.monitoredIntervalSeconds}
          onChange={editDetail('monitoredIntervalSeconds', 'number')}
        />
      </FormField>

      <Box pad="small" />

      <Box direction="row" gap="medium">
        <Button
          primary
          label="Save"
          onClick={saveMonitor}
        />
        <Button
          color="status-critical"
          label="Delete"
          onClick={deleteMonitor}
        />
      </Box>
    </Wrap>
  )
}

MonitorDetailPage.propTypes = {
  detail: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state: State, {router}) => ({
  detail: getMonitor(state, router.query.monitorId),
})

export default compose(
  withRouter,
  connect(mapStateToProps),
)(MonitorDetailPage)
