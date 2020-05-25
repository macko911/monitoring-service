import React, { FormEvent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import {
  FormField,
  TextInput,
  Button,
  Box,
  Heading,
} from 'grommet'

import * as api from '../api'
import { listMonitors } from '../store/actions'
import { MonitoredEndpoint } from '../../shared/models'

const Wrap = styled.div`
  max-width: 500px;
`

const MonitorDetailPage = ({
  dispatch,
  detail = {} as MonitoredEndpoint,
  isNew = false,
}) => { 
  const {
    name,
    url,
    monitoredIntervalSeconds,
  } = detail

  const [newDetail, setNewDetail] = React.useState(detail)
  const { push } = useRouter()

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
    dispatch(listMonitors())
  }

  async function createMonitor () {
    const res = await api.createMonitor(newDetail)
    console.log({res})
    const newId = res.data
    alert('Monitor created!')
    dispatch(listMonitors())
    push('/monitor/[monitorId]', `/monitor/${newId}`)
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
          label={isNew ? 'Create' : 'Save'}
          onClick={isNew ? createMonitor : saveMonitor}
        />
        {!isNew && (
          <Button
            color="status-critical"
            label="Delete"
            onClick={deleteMonitor}
          />
        )}
      </Box>
    </Wrap>
  )
}

MonitorDetailPage.propTypes = {
  isNew: PropTypes.bool,
  detail: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

export default MonitorDetailPage
