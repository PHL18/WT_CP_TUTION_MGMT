import React from 'react'
import { Box,Rating,Tooltip,useTheme } from '@mui/material'
import { useGetTeachersQuery } from 'state/api'
import Header from 'components/Header'
import { DataGrid } from '@mui/x-data-grid'

const Index = () => {
    const theme=useTheme()
    const {data,isLoading}=useGetTeachersQuery()
    const feedbackMessages = [
        "Excellent teaching skills!",
        "Very engaging and knowledgeable.",
        "Needs improvement in student interaction.",
        "Provides great real-world examples.",
        "Could be more punctual.",
        "Students love the teaching style!",
        "Very helpful and patient.",
        "Assignments could be more structured.",
        "Need quite a lot improvement",
        "Encourages students effectively.",
        "Needs to improve response time to queries.",
        "Highly professional and well-prepared.",
        "Sometimes lacks clarity in explanations.",
        "Very approachable and supportive.",
        "Could use more interactive activities.",
        "Explains concepts in a fun way but could be better.",
        "We do not understand him that much.",
        "Provides timely feedback on assignments.",
        "Students find the lessons very engaging.",
        "Explains concepts in a fun way."
    ];
    const ratingsArray = [5, 4, 3, 5, 2, 4, 3, 5, 1, 5, 2, 4, 3, 5, 4, 2, 1, 3, 4, 5];
    const getIncrementPercentage = (rating) => {
        switch (rating) {
            case 5: return "10%";
            case 4: return "6%";
            case 3: return "4%";
            case 2: return "2%";
            case 1: return "1%";
            default: return "0%";
        }
    };
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
            field:"country",
            headerName:"Country",
            flex:0.5
        },
        {
            field:"role",
            headerName:"Role",
            flex:0.5
        },
        {
            field: "rating",
            headerName: "Rating",
            flex: 0.5,
            renderCell: (params) => {
                const rowIndex = params.api.getRowModels().size ? [...params.api.getRowModels().keys()].indexOf(params.id) : 0;
                return <Rating value={ratingsArray[rowIndex % ratingsArray.length]} readOnly />;
            }
        },
        {
            field: "feedback",
            headerName: "Feedback",
            flex: 1.5,
            renderCell: (params) => {
                const rowIndex = params.api.getAllRowIds().indexOf(params.row._id); // Get row index
                const feedback = feedbackMessages[rowIndex % feedbackMessages.length]; // Assign feedback sequentially
                return <span>{feedback}</span>;
            }
        }
       
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
