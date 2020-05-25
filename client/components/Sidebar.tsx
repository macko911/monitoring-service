import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

const Wrap = styled(Box)`
  width: 300px;
`

const Sidebar = () => {
  return (
    <Wrap pad="small">
      Sidebar
    </Wrap>
  )
}

export default Sidebar
