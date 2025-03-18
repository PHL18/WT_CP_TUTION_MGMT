import React from "react";
import { useState } from "react";
import { useGetStudentsQuery } from "state/api";
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
} from "@mui/material";
import Header from "components/Header";

const Stud = ({
  _id,
  name,
  age,
  feesPaid,
  attendance,
  marks,
  guardianName,
  stat,
}) => {
  const theme = useTheme();
  const [isExpaned, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[200]}
          gutterBottom
        >
          Name : {name}
        </Typography>
        <Typography variant="h5" component="div">
          Performance : {marks}
        </Typography>
        <Typography variant="h5" component="div">
          Age : {age}
        </Typography>
        <Typography
          sx={{ mb: "1.5rem"}}
          color={theme.palette.secondary[200]}
          component="div"
        >
          Attendance: {Number(attendance)}%
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" position="relative" width={100} height={100}>
          <CircularProgress
            variant="determinate"
            value={attendance}
            size={100}
            thickness={6}
            sx={{color: theme.palette.secondary[200],mb:"20px"}}
          />
          <Typography
            variant="h6"
            component="div"
            color={theme.palette.secondary[200]}
            sx={{ position: "absolute" ,mb:"1rem"}}
          >
            {`${attendance}%`}
          </Typography>
        </Box>
        <Typography variant="body2">Fees Paid : {feesPaid}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpaned)}
        >
          See more
        </Button>
      </CardActions>
      <Collapse
        in={isExpaned}
        timeout="auto"
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id : {_id}</Typography>
          <Typography>Guardian name : {guardianName}</Typography>
          <Typography>Monthly Data : {stat.monthlyData}</Typography>
          <Typography>Daily Data : {stat.dailyData}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Students = () => {
  const { data, isLoading } = useGetStudentsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log(isLoading);
  console.log(data);

  return (
    <Box m="20px">
      <Header title="Students enrolled" subtitle="Details of students"></Header>
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(({ _id, name, age, feesPaid, attendance, marks, guardianName, stat }) => (
            <Stud
              key={_id}
              _id={_id}
              name={name}
              age={age}
              feesPaid={feesPaid}
              attendance={attendance}
              marks={marks}
              guardianName={guardianName}
              stat={stat}
            />
          ))}
        </Box>
      ) : (
        <>Loading..</>
      )}
    </Box>
  );
};

export default Students;
