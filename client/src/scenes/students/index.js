import React, { useState } from "react";
import { useGetStudentsQuery, useAddStudentMutation,useDeleteStudentMutation } from "state/api";
import {
  Box,
  Card,
  CardActions,
  Collapse,
  Button,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  CardContent,
  Modal,
  TextField,
} from "@mui/material";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";

const Stud = ({ _id, name, age,className, feesPaid, attendance, marks, guardianName,handledelete}) => {
  const theme = useTheme();
  
  const [isExpanded, setIsExpanded] = useState(false);

  


  return (
    <Card sx={{ backgroundImage: "none", backgroundColor: theme.palette.background.alt, borderRadius: "0.55rem" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[200]} gutterBottom>
          Name: {name}
        </Typography>
        <Typography variant="h5">Performance: {marks}</Typography>
        <Typography variant="h5">Age: {age}</Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[200]}>Attendance: {Number(attendance)}%</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" position="relative" width={100} height={100}>
          <CircularProgress variant="determinate" value={attendance} size={100} thickness={6} sx={{ color: theme.palette.secondary[200], mb: "20px" }} />
          <Typography variant="h6" color={theme.palette.secondary[200]} sx={{ position: "absolute", mb: "1rem" }}>
            {`${attendance}%`}
          </Typography>
        </Box>
        <Typography variant="body2">Fees Paid: {feesPaid}</Typography>
      </CardContent>
      <CardActions>
        <FlexBetween>
        <Button variant="contained" size="small" onClick={() => setIsExpanded(!isExpanded)}>
          See more
        </Button>
        {/* <Button onClick={()=>handledelete(_id)} variant="contained" size="small" sx={{ml:"10px",bgcolor:"#FF746C"}}>Delete</Button> */}
        </FlexBetween>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" sx={{ color: theme.palette.neutral[300] }}>
        <CardContent>
          <Typography>ID: {_id}</Typography>
          <Typography>Guardian Name: {guardianName}</Typography>
          <Typography>Class:{className}</Typography>
        
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Students = () => {
  const { data, isLoading, refetch } = useGetStudentsQuery();
  const [addStudent] = useAddStudentMutation();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [studentDeleted]=useDeleteStudentMutation()
  const [studentData, setStudentData] = useState({ 
    name: "", 
    age: "", 
    className: "", 
    subject: "", 
    attendance:50,
    marks:0,
    feesPaid:0, 
    guardianName: "",
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: name === "age" || name === "attendance" || name === "marks" || name === "feesPaid" ? Number(value) : value,
    });
  };
  const handledelete = async (studentId) => {
    try {
      await studentDeleted(studentId);
      refetch();
    } catch (error) {
      console.error("Error occurred while deleting student:", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form default behavior
  
    ; // Debugging: Log form data
  
    // Validate required fields
    if (
      !studentData.name.trim() ||
      !studentData.age ||
      !studentData.className.trim() ||
      !studentData.subject.trim() ||
      !studentData.guardianName.trim()
    ) {
      console.error("All fields are required.");
      return;
    }
  
    // Extract numeric part from existing student IDs
    const existingIds = data.map(student => parseInt(student._id.replace("stu", ""), 10));
    const nextId = Math.max(...existingIds, 10) + 1; // Start from stu011
    const newStudentId = `stu${String(nextId).padStart(3, "0")}`; // Ensures stuXXX format
  
    const newStudentData = {
      ...studentData,
      _id: newStudentId, // Assign the generated student ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log(newStudentData)
  
    try {
      const response = await fetch("http://localhost:5001/client/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudentData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add student");
      }
  
      const result = await response.json();
      console.log("Student added successfully:", result);
  
      setOpen(false); // Close modal after submission
      setStudentData({
        name: "",
        age: "",
        className: "",
        subject: "",
        attendance: 0,
        marks: 0,
        feesPaid: 0,
        guardianName: "",
      }); // Reset form
  
      refetch(); // Refresh students list
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  return (
    <Box m="20px">
      <Header title="Students Enrolled" subtitle="Details of students" />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Student
        </Button>
      </Box>
      {data || !isLoading ? (
        <Box mt="20px" display="grid" gridTemplateColumns="repeat(4, minmax(0, 1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%" sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
          {data.map(({ _id, name, age, feesPaid, attendance, marks, guardianName, stat,className}) => (
            <Stud key={_id} _id={_id} name={name} age={age} feesPaid={feesPaid} attendance={attendance} marks={marks} guardianName={guardianName} stat={stat}  className={className} handledelete={handledelete}/>
          ))}
        </Box>
      ) : (
        <>Loading..</>
      )}

      {/* Modal for Adding Student */}
      <Modal open={open} onClose={() => setOpen(false)}>
  <Box
    p={4}
    bgcolor={theme.palette.background.alt}
    width={400}
    mx="auto"
    mt={10}
    borderRadius={2}
    boxShadow={3}
  >
    <Typography variant="h6" mb={2}>Add New Student</Typography>
    <form onSubmit={handleSubmit}>
      <TextField fullWidth label="Name" name="name" value={studentData.name} onChange={handleInputChange} margin="dense" required />
      <TextField fullWidth label="Age" name="age" type="number" value={studentData.age} onChange={handleInputChange} margin="dense" required />
      <TextField fullWidth label="Class" name="className" value={studentData.className} onChange={handleInputChange} margin="dense" required />
      <TextField fullWidth label="Subject" name="subject" value={studentData.subject} onChange={handleInputChange} margin="dense" required />
      <TextField fullWidth label="Guardian Name" name="guardianName" value={studentData.guardianName} onChange={handleInputChange} margin="dense" required />
      <TextField fullWidth label="Fees Paid" name="feesPaid" type="number" value={studentData.feesPaid} onChange={handleInputChange} margin="dense" required />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </Box>
    </form>
  </Box>
</Modal>
    </Box>
  );
};

export default Students;