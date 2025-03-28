import React, { useState } from "react";
import { Box, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useGetPerformanceQuery } from "state/api";

const Index = () => {
  // Sample student data
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", attendance: false },
    { id: 2, name: "Jane Smith", email: "jane@example.com", attendance: false },
    { id: 3, name: "Alice Brown", email: "alice@example.com", attendance: false },
    { id: 4, name: "Bob Johnson", email: "bob@example.com", attendance: false },
  ]);
  const {data,isLoading}=useGetPerformanceQuery();
  console.log(data,isLoading)

  // Function to toggle attendance
  const toggleAttendance = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, attendance: !student.attendance } : student
      )
    );
  };

  // Define DataGrid columns
  const columns = [
    { field: "name", headerName: "Student Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "attendance",
      headerName: "Attendance",
      flex: 0.5,
      renderCell: (params) => (
        <Switch
          checked={params.row.attendance}
          onChange={() => toggleAttendance(params.row.id)}
        />
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Mark Attendance" subtitle="Mark Students" />
      <Box mt="40px" height="75vh">
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Index;