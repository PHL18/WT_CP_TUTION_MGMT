import React, { use, useState } from "react";
import { Box, Toolbar, Typography, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import DataGridCustomToolBar from "components/DataGridCustomToolBar";
const Index = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput,setSearchInput]=useState("")
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  const columns=[
  
    {
        field:"userId",
        headerName:"User ID",
        flex:1
    },
    {
        field:"transactionId",
        headerName:"Transaction ID",
        flex:1
    },
    {
        field:"studentId",
        headerName:"Student ID",
        flex:1
    },
    {
        field:"transactionType",
        headerName:"Transaction Type",
        flex:1
    },
    {
        field:"createdAt",
        headerName:"Created At",
        flex:1
    },
    {
        field: "amount",
        headerName: "Amount",
        flex: 1,
        renderCell: (params) => (
          <Typography
            sx={{
                mt:"1rem",
                textAlign:"left",
              color: theme.palette.mode === "dark" ? theme.palette.secondary[400] :theme.palette.secondary[200],
              fontWeight: "bold",
            }}
          >
            ₹{params.value}
          </Typography>
        ),
      },
  ]
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Transactions" subtitle="transactions made"></Header>
      <Box height="80vh" mt="1rem"
       sx={{
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
          rows={data && data.transactions || []}
          columns={columns} 
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          paginationMode="server"
          pageSize={pageSize}
          sortingMode="server"
          onPageChange={(newpage)=>setPage(newpage)}
          onPageSizeChange={(newPageSize)=>setPageSize(newPageSize)}
          onSortModelChange={(newSortModel)=>setSort(newSortModel)}
          slots={{toolbar:DataGridCustomToolBar}}
          slotProps={{
            toolbar: { searchInput, setSearchInput,setSearch }
          }}
          ></DataGrid>
      </Box>
    </Box>
  );
};

export default Index;
