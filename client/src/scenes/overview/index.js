import { Box } from "@mui/material";
import Header from "components/Header";
import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import OverviewChart from "components/OverviewChart";

const Index = () => {
  const [view, setView] = useState("units");
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Overview Data" subtitle="sales"></Header>
      <Box height="75vh">

        <OverviewChart view={view}></OverviewChart>
      </Box>
    </Box>
  );
};

export default Index;
