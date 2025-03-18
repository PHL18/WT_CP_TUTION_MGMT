import { Box ,useTheme} from '@mui/material'
import Header from 'components/Header'
import React from 'react'
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetAdminsQuery } from 'state/api';
import DataGridCustomToolBar from 'components/DataGridCustomToolBar';

const Index = () => {
    const theme=useTheme();
    const {data,isLoading}=useGetAdminsQuery();
    const [search, setSearch] = useState("");
    const [searchInput,setSearchInput]=useState("")
    const columns=[
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
          field:"role",
          headerName:"Role",
          flex:0.5
      },
  ]
    console.log(data)
  return (
   <Box m="1.5rem 2.5rem">
    <Header title="Admin Page" subtitle="Managing admins and list of admins"></Header>
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
        slots={{toolbar:DataGridCustomToolBar}}
        />
    </Box>
   </Box>
  )
}

export default Index
