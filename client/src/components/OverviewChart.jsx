import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api"; // Your API fetch function

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery(); // Fetch data from API

  console.log("API Data:", data);

  // Transform the data for Nivo Line Chart
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data.monthlyData) || data.monthlyData.length === 0) {
      return [];
    }

    const totalStudentsData = {
      id: "Total Students",
      color: theme.palette.secondary.main,
      data: data.monthlyData.map(({ month, totalStudentsEnrolled }) => ({
        x: month,
        y: totalStudentsEnrolled
      }))
    };

    const feesCollectedData = {
      id: "Fees Collected",
      color: theme.palette.secondary?.[600] || "#ff0000",
      data: data.monthlyData.map(({ month, feesCollected }) => ({
        x: month,
        y: feesCollected
      }))
    };

    return [totalStudentsData, feesCollectedData];
  }, [data, theme]);

  if (!data || isLoading) return <div>Loading...</div>;

  return (
    <div style={{ height: "100%",width:"100%"}}>
      <ResponsiveLine
        data={chartData}  // ✅ Pass transformed data here
        margin={{ top: 50, right: 110, bottom: 50, left: 70 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (v) => (isDashboard ? v.slice(0, 3) : v),
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendOffset: 36,
          legendPosition: "middle"
        }}
        axisLeft={{
        
          tickSize: 10,
          tickPadding: 0,
          tickRotation: 0,
          legend: "Fees",
          legendOffset: -50,
          legendPosition: "middle"
        }}
        enableGridY={false}
        enableGridX={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        enableArea={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 30,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        // ✅ Apply Theme-Based Text Styling
        theme={{
          textColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          axis: {
            ticks: {
              text: {
                fill: theme.palette.text.primary, // Theme-based axis labels
              },
            },
            legend: {
              text: {
                fill: theme.palette.text.primary, // Theme-based legend labels
              },
            },
          },
          tooltip: {
            container: {
              background: theme.palette.background.default, // Themed tooltip background
              color: theme.palette.text.primary, // Themed tooltip text
            },
          },
          legends: {
            text: {
              fill: theme.palette.text.primary, // Themed legend text
            },
          },
        }}
      />
    </div>
  );
};

export default OverviewChart;