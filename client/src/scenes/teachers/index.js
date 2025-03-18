import React from 'react'
import { Box,useTheme } from '@mui/material'
import { useGetTeachersQuery } from 'state/api'
import Header from 'components/Header'
import { DataGrid } from '@mui/x-data-grid'

const Index = () => {
    const theme=useTheme()
    const {data,isLoading} =useGetTeachersQuery()
    console.log(data)
    const columns=[
        {
            field:"_id",
            headerName:"ID",
            flex:1,

        },
        {
            field:"name",
            headerName:"Name",
            flex:0.5,

        },
        {
            field:"email",
            headerName:"Email",
            flex:1,

        },
        
        {
            field:"country",
            headerName:"Country",
            flex:0.5
        },
        {
            field:"role",
            headerName:"Role",
            flex:0.5
        },
    ]
  return (
   <Box m="1.5rem 2.5rem">
    <Header title="Teachers" subtitle="Associated Teachers"></Header>
    <Box mt="40px" height="75vh" sx={{
        "& .MuiDataGrid-root":{
            border:"none"
        },
        "& .MuiDataGrid-cell":{
            borderBottom:"none",

        },
        "& .MuiDataGrid-columnHeader":{
            backgroundColor:theme.palette.background.alt,
            color:theme.palette.secondary[100],
            borderBottom:"none"
        },
        "& .MuiDataGrid-virtualScroller":{
            backgroundColor:theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer":{
            backgroundColor:theme.palette.background.alt,
            color:theme.palette.secondary[100],
            borderTop:"none"
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
            color:`${theme.palette.secondary[200]} !important`
        }
    }}>
        <DataGrid
        loading={isLoading || !data}
        getRowId={(row)=>row._id }
        rows={data || []}
        columns={columns}
        />
    </Box>
   </Box>
  )
}

export default Index
