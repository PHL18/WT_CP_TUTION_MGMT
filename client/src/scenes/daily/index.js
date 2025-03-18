import { Box, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import Header from "components/Header";
import { useGetDailyQuery } from "state/api";
import { ResponsiveBar} from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
const Index = () => {
  const { data, isLoading } = useGetDailyQuery();
  const theme = useTheme();

  const [selectedBranch, setSelectedBranch] = useState("");

  const branchOptions = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data[0].branches.map((branch) => branch.branchName);
  }, [data]);

  const barData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data[0].branches.map((branch) => ({
      branch: branch.branchName,
      avgDailyAttendance: branch.avgDailyAttendance,
      avgAttendanceRate: branch.avgAttendanceRate,
      avgClassesHeld: branch.avgClassesHeld,
      attendancePerClass: branch.attendancePerClass,
      totalStudents: branch.totalStudents,
    }));
  }, [data]);

  const lineData = useMemo(() => {
    if (!data || data.length === 0 || !selectedBranch) return [];
    const branch = data[0].branches.find((b) => b.branchName === selectedBranch);
    if (!branch || !branch.dailyAttendancePercentage) return [];
    return [
      {
        id: "Attendance Percentage",
        data: branch.dailyAttendancePercentage.map((entry) => ({
          x: entry.date,
          y: entry.percentage,
        })),
      },
    ];
  }, [data, selectedBranch]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Daily Data" subtitle="Track your trends over time" />

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Select Branch</InputLabel>
        <Select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          label="Select Branch"
        >
          {branchOptions.map((branch) => (
            <MenuItem key={branch} value={branch}>
              {branch}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box height="75vh">
        {!isLoading && barData.length > 0 ? (
          <ResponsiveBar
            data={barData}
            keys={[
              "avgDailyAttendance",
              "avgAttendanceRate",
              "avgClassesHeld",
              "attendancePerClass",
              "totalStudents",
            ]}
            indexBy="branch"
            margin={{ top: 30, right: 130, bottom: 50, left: 60 }}
            padding={0.2}
            colors={{ scheme: "nivo" }}
            groupMode="stacked"
            axisBottom={{
              tickSize: 5,
              tickPadding: 10, 
              tickRotation: 0,
              legend: "Branches",
              legendPosition: "middle",
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Value",
              legendPosition: "middle",
              legendOffset: -50,
            }}
            enableGridX={false}
            enableGridY={false}
            labelTextColor={theme.palette.secondary[100]}
            theme={{
              textColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              axis: {
                ticks: {
                  text: {
                    fill: theme.palette.text.primary,
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.text.primary,
                  },
                },
              },
              tooltip: {
                container: {
                  background: theme.palette.background.alt,
                  color: theme.palette.text.primary,
                },
              },
              legends: {
                text: {
                  fill: theme.palette.text.primary,
                },
              },
            }}
          />
        ) : (
          <p>
            {isLoading
              ? "Loading data..."
              : "No data available for the selected branch."}
          </p>
        )}
      </Box>

      {selectedBranch && lineData.length > 0 && (
        <Box height="75vh" mt="2rem">
          <Typography sx={{fontWeight:"bold"}}>Branch</Typography>
         <Header title={selectedBranch} subtitle="Daily attendance"/>
          <ResponsiveLine
            data={lineData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: 0, max: 100 }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              legend: "Date",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              legend: "Attendance Percentage",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            colors={{ scheme: "accent" }}
            curve="natural"
            pointSize={10}
            pointBorderWidth={2}
            pointLabelYOffset={-12}
            useMesh={true}
            enableArea={true}
            enableGridX={false}
            enableGridY={false} 
            theme={{
              textColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              axis: {
                ticks: {
                  text: {
                    fill: theme.palette.text.primary,
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.text.primary,
                  },
                },
              },
              tooltip: {
                container: {
                  background: theme.palette.background.alt,
                  color: theme.palette.text.primary,
                },
              },
              legends: {
                text: {
                  fill: theme.palette.text.primary,
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Index;