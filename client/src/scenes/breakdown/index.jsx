import React from 'react'
import { Box } from '@mui/material'
import Header from 'components/Header'
import BreakdownChart from 'components/BreakdownChart'
const Index = () => {
  return (
    <div>
      <Box m="1.5rem 2.5rem">
        <Header title="Breakdown" subtitle="Expenses Breakdown">
        </Header>
        <BreakdownChart></BreakdownChart>
      </Box>
    </div>
  )
}

export default Index
