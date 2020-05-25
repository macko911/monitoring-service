import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

const Wrap = styled(Box)`
  min-width: 300px;
`

export const Sidebar = () => {
  return (
    <Wrap pad="small">
      Sidebar
    </Wrap>
  )
}
