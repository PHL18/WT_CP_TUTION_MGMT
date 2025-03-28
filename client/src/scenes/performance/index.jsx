import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, Typography, useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import Header from 'components/Header';
import { useGetPerformanceQuery } from 'state/api';
import FlexBetween from 'components/FlexBetween';
import * as XLSX from 'xlsx';

const Index = () => {
    const { data, isLoading } = useGetPerformanceQuery();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const theme = useTheme();

    if (isLoading) return <div>Loading...</div>;
    if (!data || data.length === 0) return <div>No Data Available</div>;

    // Initialize selected student to the first student if not set
    const student = selectedStudent || data[0];

    // Function to download all students' data as an Excel file
    const downloadExcel = () => {
        const formattedData = data.map(student => ({
            ID: student.id,
            Name: student.name,
            Attendance: student.attendance_percentage + "%",
            ...Object.fromEntries(
                Object.entries(student.subjects).flatMap(([subject, scores]) => [
                    [`${subject} MSE`, scores.MSE],
                    [`${subject} ESE`, scores.ESE]
                ])
            )
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students Performance");
        XLSX.writeFile(workbook, "Student_Performance.xlsx");
    };

    // Transform selected student's subjects data for Nivo Bar Chart
    const chartData = Object.entries(student.subjects).map(([subject, scores]) => ({
        subject,
        MSE: scores.MSE,
        ESE: scores.ESE
    }));

    // Transform student attendance data for Nivo Pie Chart
    const attendanceData = [
        { id: "Present", label: "Present", value: student.attendance_percentage, color: "hsl(120, 70%, 50%)" },
        { id: "Absent", label: "Absent", value: 100 - student.attendance_percentage, color: "hsl(0, 70%, 50%)" }
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="Performance" subtitle="MSE & ESE Performance Insights with Attendance Data" />
                <Button
                    onClick={downloadExcel}
                    sx={{
                        bgcolor: theme.palette.secondary.light,
                        color: theme.palette.background.alt,
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                    }}
                >
                    Download Sheet
                </Button>
            </FlexBetween>

            {/* Student Dropdown */}
            <Box mb={2}>
                <Typography variant="h6" mb={1}>Select Student:</Typography>
                <Select
                    value={student.id}
                    onChange={(e) => setSelectedStudent(data.find(s => s.id === e.target.value))}
                    sx={{ minWidth: 200 }}
                >
                    {data.map(student => (
                        <MenuItem key={student.id} value={student.id}>
                            {student.name}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Charts Container */}
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="20px" height="50vh">
                
                {/* Bar Chart (MSE & ESE Scores) */}
                <Box height="60vh">
                    <Typography variant="h6" align="center" mb={1}>MSE & ESE Scores</Typography>
                    <ResponsiveBar
                        data={chartData}
                        keys={['MSE', 'ESE']} // Bar categories
                        indexBy="subject" // X-axis labels
                        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                        padding={0.3}
                        colors={{ scheme: 'pastel1' }}
                        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Subjects',
                            legendPosition: 'middle',
                            legendOffset: 40,
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 2,
                            tickRotation: 0,
                            legend: 'Score',
                            legendPosition: 'middle',
                            legendOffset: -50,
                        }}
                        theme={{
                            textColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            axis: {
                                ticks: { text: { fill: theme.palette.text.primary } },
                                legend: { text: { fill: theme.palette.text.primary } },
                            },
                            tooltip: {
                                container: {
                                    background: theme.palette.background.alt,
                                    color: theme.palette.text.primary,
                                },
                            },
                            legends: { text: { fill: theme.palette.text.primary } },
                        }}
                        enableLabel={true}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        enableGridX={false}
                        enableGridY={false}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'top-left',
                                direction: 'row',
                                translateX: 40,
                                itemsSpacing: 2,
                                translateY:-40,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                            }
                        ]}
                    />
                </Box>

                {/* Pie Chart (Attendance Insights) */}
                <Box height="60vh">
                    <Typography variant="h6" align="center" mb={1}>Attendance Insights</Typography>
                    <ResponsivePie
                        data={attendanceData}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        colors={{ scheme: 'paired' }}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor={theme.palette.text.primary}
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={theme.palette.mode === "dark" ? "#ffffff" : "#000000"}
                        theme={{
                            textColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                            tooltip: {
                                container: {
                                    background: theme.palette.background.alt,
                                    color: theme.palette.text.primary,
                                },
                            },
                        }}
                        legends={[
                            {
                                anchor: "bottom",
                                direction: "row",
                                translateY: 50,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: theme.palette.text.primary,
                                symbolSize: 18,
                                symbolShape: "circle",
                            }
                        ]}
                    />
                </Box>

            </Box>
        </Box>
    );
};

export default Index;