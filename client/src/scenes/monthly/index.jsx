import React, { useState } from "react";
import { Box, Switch, Button, Typography,useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useGetPerformanceQuery } from "state/api";
import { green } from "@mui/material/colors";

const Index = () => {
  const theme=useTheme()
  const [students, setStudents] = useState([
    { id: 1, name: "Aarav Sharma", rollNumber: "101", attendance: false },
    { id: 2, name: "Bhavya Verma", rollNumber: "102", attendance: false },
    { id: 3, name: "Charvi Patel", rollNumber: "103", attendance: false },
    { id: 4, name: "Devansh Iyer", rollNumber: "104", attendance: false },
    { id: 5, name: "Esha Nair", rollNumber: "105", attendance: false },
    { id: 6, name: "Farhan Reddy", rollNumber: "106", attendance: false },
    { id: 7, name: "Gauri Singh", rollNumber: "107", attendance: false },
    { id: 8, name: "Harsh Rajput", rollNumber: "108", attendance: false },
    { id: 9, name: "Ishaan Kulkarni", rollNumber: "109", attendance: false },
    { id: 10, name: "Jiya Malhotra", rollNumber: "110", attendance: false },
    { id: 11, name: "Kabir Thakur", rollNumber: "111", attendance: false },
    { id: 12, name: "Lavanya Deshmukh", rollNumber: "112", attendance: false },
    { id: 13, name: "Mihir Choudhary", rollNumber: "113", attendance: false },
    { id: 14, name: "Neha Saxena", rollNumber: "114", attendance: false },
    { id: 15, name: "Omkar Joshi", rollNumber: "115", attendance: false },
    { id: 16, name: "Prisha Mehta", rollNumber: "116", attendance: false },
    { id: 17, name: "Qasim Ahmed", rollNumber: "117", attendance: false },
    { id: 18, name: "Riya Kapoor", rollNumber: "118", attendance: false },
    { id: 19, name: "Samar Bose", rollNumber: "119", attendance: false },
    { id: 20, name: "Tanisha Sinha", rollNumber: "120", attendance: false },
    { id: 21, name: "Utkarsh Bansal", rollNumber: "121", attendance: false },
    { id: 22, name: "Vanya Pandey", rollNumber: "122", attendance: false },
    { id: 23, name: "Yashwant Ghosh", rollNumber: "123", attendance: false },
    { id: 24, name: "Zoya Dutta", rollNumber: "124", attendance: false },
  ]);

  const { data, isLoading } = useGetPerformanceQuery();
  console.log(data, isLoading);

  const [prevState, setPrevState] = useState([...students]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const toggleAttendance = (id) => {
    setPrevState([...students]);
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, attendance: !student.attendance } : student
      )
    );
  };

  const undoLastAction = () => {
    setStudents([...prevState]);
  };

  const pickRandomStudent = () => {
    const presentStudents = students.filter((s) => s.attendance);
    if (presentStudents.length > 0) {
      const randomStudent = presentStudents[Math.floor(Math.random() * presentStudents.length)];
      setSelectedStudent(randomStudent.name);
    } else {
      setSelectedStudent("No students present!");
    }
  };

  const presentCount = students.filter((s) => s.attendance).length;
  const absentCount = students.length - presentCount;

  const columns = [
    { field: "name", headerName: "Student Name", flex: 1 },
    { field: "rollNumber", headerName: "Roll Number", flex: 1 },
    {
      field: "attendance",
      headerName: "Attendance",
      flex: 0.5,
      renderCell: (params) => (
        <Switch sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
      color:theme.palette.secondary[300], // Thumb color when checked
      "& + .MuiSwitch-track": {
        backgroundColor: "gray", // Track color when checked
      },
      
    },
        }}
          checked={params.row.attendance}
          onChange={() => toggleAttendance(params.row.id)}
        />
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Mark Attendance" subtitle="Mark Students" />
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="h6">Present: {presentCount} | Absent: {absentCount}</Typography>
        <Button variant="contained" color="primary" onClick={undoLastAction}>
          Undo Last Action
        </Button>
        <Button variant="contained" color="secondary" onClick={pickRandomStudent}>
          Pick Random Student
        </Button>
      </Box>
      {selectedStudent && (
        <Typography variant="h6" mt={2} color={theme.palette.secondary[300]} fontWeight="bold">
          🎉 {selectedStudent} was chosen!
        </Typography>
      )}
      <Box mt="40px" height="75vh">
        <DataGrid  sx={{
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
    }} rows={students} columns={columns} pageSize={10} disableSelectionOnClick />
      </Box>
    </Box>
  );
};

export default Index;
