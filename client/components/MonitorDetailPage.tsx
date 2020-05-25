import React, { FormEvent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import {
  FormField,
  TextInput,
  Button,
  Box,
  Heading,
  Grid,
} from 'grommet'

import * as api from '../api'
import { listMonitors } from '../store/actions'
import { MonitoredEndpoint } from '../../shared/models'

const Wrap = styled(Box)`
  max-width: 500px;
`

const Result = styled.div`
  padding: 10px;
`

const Codeblock = styled.code`
  display: block;
  font-size: 14px;
  padding: 7px;
  background: rgb(245, 245, 245);
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
  const [results, setResults] = React.useState([])
  const [isFetching, setFetching] = React.useState(false)
  const { push } = useRouter()

  React.useEffect(() => {
    setNewDetail(detail)
    fetchResults()
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

  async function fetchResults () {
    if (!detail.id || isNew)  {
      return
    }
    const res = await api.getResults(detail.id)
    setResults(res.data)
  }

  async function saveMonitor () {
    try {
      setFetching(true)
      await api.saveMonitor(newDetail)
      alert('Monitor saved!')
      dispatch(listMonitors())
    } catch (err) {
      console.error(err)
      alert('Failed to save monitor!')
    } finally {
      setFetching(false)
    }
  }

  async function createMonitor () {
    try {
      setFetching(true)
      let newId = ''
      const res = await api.createMonitor(newDetail)
      newId = res.data
      alert('Monitor created!')
      dispatch(listMonitors())
      push('/monitor/[monitorId]', `/monitor/${newId}`)
    } catch (err) {
      console.error(err)
      alert('Failed to create new monitor!')
    } finally {
      setFetching(false)
    }
  }

  async function deleteMonitor () {
    try {
      setFetching(true)
      await api.deleteMonitor(detail.id)
      alert('Monitor deleted!')
      dispatch(listMonitors())
      push('/')
    } catch (err) {
      console.error(err)
    } finally {
      setFetching(false)
    }
  }

  return (
    <Grid
      columns={{
        count: 2,
        size: 'auto',
      }}
    >
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

        <FormField label="Monitoring Interval (seconds)">
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
            disabled={isFetching}
            label={isNew ? 'Create' : 'Save'}
            onClick={isNew ? createMonitor : saveMonitor}
          />
          {!isNew && (
            <Button
              disabled={isFetching}
              color="status-critical"
              label="Delete"
              onClick={deleteMonitor}
            />
          )}
        </Box>
      </Wrap>
      <Box>
        <Heading level={3} as="div">Latest Results</Heading>

        <Box pad="small" />

        {results.length === 0 && (
          <i>
            No results yet...
          </i>
        )}

        {results.map((result) => {
          const {dateCreated, response} = result
          const date = dayjs(dateCreated).format('YYYY/MM/DD HH:mm:ss')
          return (
            <Result key={result.id}>
              <strong>
                {date}
              </strong>
              <div>
                Status: {response.statusCode}
              </div>
              <div>
                Content Type: {response.contentType}
              </div>
              <div>
                Payload:
                {response.payload ? (
                  <Codeblock>
                    {response.payload}
                  </Codeblock>
                ) : ' - '}
              </div>
            </Result>
          )
        })}
      </Box>
    </Grid>
  )
}

MonitorDetailPage.propTypes = {
  isNew: PropTypes.bool,
  detail: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

export default MonitorDetailPage
