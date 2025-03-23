import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetNewTransactionQuery } from "state/api"; // API hook

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetNewTransactionQuery();
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";
  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[100],
    theme.palette.secondary[200]
  ];

  // ✅ Ensure data is in the correct format
  const transactions = Array.isArray(data.transactions)
    ? data.transactions
    : [];

  // ✅ Aggregate transaction amounts by type
  const transactionCategories = transactions.reduce((acc, transaction) => {
    if (!transaction?.transactionType || isNaN(transaction?.amount)) return acc;

    const { transactionType, amount } = transaction;
    acc[transactionType] = (acc[transactionType] || 0) + amount;
    return acc;
  }, {});

  // ✅ Convert data to Nivo Pie Chart format
  const formattedData = Object.entries(transactionCategories).map(
    ([type, value], i) => ({
      id: type,
      label: type,
      value,
      color: colors[i%colors.length] // Generate dynamic colors
    })
  );

  console.log("Formatted Data:", JSON.stringify(formattedData, null, 2));

  // ✅ If no data available, return message instead of an empty chart
  if (formattedData.length === 0)
    return <Typography>No Data Available</Typography>;

  return (
    <Box
      height="500px"
      minHeight="75vh"
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
      mt="-50px"
    >
      <ResponsivePie
        data={formattedData} // ✅ Use correct data
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        colors={formattedData.map((d) => d.color)} 
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        enableArcLinkLabels={true}
        borderWidth={2}
        borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 5]] }}
        theme={{
          textColor: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          tooltip: {
            container: {
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          },
          legends: {
            text: { fill: theme.palette.text.primary },
          },
        }}
        
      />
      {/* Centered Total Amount */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        sx={{
          transform: isDashboard
            ? "translate(-75%,-170%)"
            : "translate(-50%,-100%)",
        }}
      >
        <Typography variant="h6" color={theme.palette.secondary[300]}>
          {"Total: ₹"}
          {Object.values(transactionCategories).reduce((a, b) => a + b, 0)}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
