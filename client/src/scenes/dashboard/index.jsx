import React from "react";
import { useState, useMemo } from "react";
import {
  Box,
  useTheme,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetAdminsQuery, useGetDashboardStatsQuery, useGetGeographyQuery } from "state/api";
import { useGetTeachersQuery } from "state/api";
import { useGetDailyQuery } from "state/api";
import { ResponsiveBar } from "@nivo/bar";
import FlexBetween from "components/FlexBetween";
import StatBox from "components/StatBox";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Person2Outlined,
  HouseOutlined,
  Money,
  MoneyOffRounded,
  MoneyOutlined,
  MonetizationOn,
  Traffic,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";

import { useGetPerformanceQuery } from "state/api";

const Dashboard = () => {

  const theme = useTheme();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const isNonMediumScreens = useMediaQuery("(min-width:1200px)");
  const { data, isLoading } = useGetDashboardStatsQuery();
  const { data1, isLoading1 } = useGetAdminsQuery();
  
 
  const data4=[
    {
      _id: "63701cc1f03239c72c00017f",
      name: "Konstantine",
      email: "kranstead0@narod.ru",
      password: "omMDCh",
      city: "Nurabelen",
      state: null,
      country: "ID",
      occupation: "Computer Systems Analyst I",
      phoneNumber: "8346315874",
      transactions: [
        "63701d74f0323986f3000158",
        "63701d74f03239d40b00007e",
        "63701d74f03239867500014b",
        "63701d74f032398675000152",
      ],
      role: "superadmin",
    },
    {
      _id: "63701cc1f03239c72c000180",
      name: "Marilyn",
      email: "mdonlon1@hostgator.com",
      password: "XRYBnKAfm",
      city: "Zhanghekou",
      state: null,
      country: "CN",
      occupation: "Food Chemist",
      phoneNumber: "9981906117",
      transactions: [
        "63701d74f03239b7f7000027",
        "63701d74f03239db69000153",
        "63701d74f03239569400002d",
        "63701d74f032394c4900014b",
      ],
      role: "user",
    },
    {
      _id: "63701cc1f03239c72c000181",
      name: "Olly",
      email: "oveneur2@marketwatch.com",
      password: "WwDjOlH",
      city: "Muang Sam Sip",
      state: null,
      country: "TH",
      occupation: "Staff Scientist",
      phoneNumber: "3868813669",
      transactions: [
        "63701d74f03239d40b00008c",
        "63701d74f03239b7f700001e",
        "63701d74f03239867500012e",
        "63701d74f03239db69000132",
        "63701d74f032390a34000340",
        "63701d74f03239d40b000087",
      ],
      role: "admin",
    },
    {
      _id: "63701cc1f03239c72c000182",
      name: "Hale",
      email: "hpyrah3@bbc.co.uk",
      password: "vojl4bBDJ",
      city: "San Luis",
      state: null,
      country: "AR",
      occupation: "Associate Professor",
      phoneNumber: "8535391908",
      transactions: [
        "63701d74f032390a3400032f",
        "63701d74f032390a3400033f",
        "63701d74f03239d59100034c",
        "63701d74f03239569400001a",
        "63701d74f03239c72c0001a0",
        "63701d74f032399c0000013d",
        "63701d74f03239db69000152",
        "63701d74f03239b91300001c",
        "63701d74f03239cdc500003f",
        "63701d74f03239bef0000159",
      ],
      role: "superadmin",
    },
    {
      _id: "63701cc1f03239c72c000183",
      name: "Allie",
      email: "afranzschoninger4@simplemachines.org",
      password: "zocih1DjIv",
      city: "Osieck",
      state: null,
      country: "PL",
      occupation: "Senior Cost Accountant",
      phoneNumber: "5367727534",
      transactions: [
        "63701d74f032395694000036",
        "63701d74f032395b33000138",
        "63701d74f032394441000314",
      ],
      role: "superadmin",
    },
    {
      _id: "63701cc1f03239c72c000184",
      name: "Donelle",
      email: "dcrossgrove5@constantcontact.com",
      password: "Q81bu6JV",
      city: "São Jerônimo",
      state: null,
      country: "BR",
      occupation: "Chemical Engineer",
      phoneNumber: "8601650433",
      transactions: [
        "63701d74f03239d40b000078",
        "63701d74f03239db69000157",
        "63701d74f03239b7f7000025",
        "63701d74f032395694000042",
        "63701d74f03239d591000339",
        "63701d74f03239b7f700003d",
        "63701d74f032396b8e000029",
        "63701d74f03239d81e00003e",
        "63701d74f03239d81e000032",
        "63701d74f03239db6900013d",
      ],
      role: "user",
    },
    {
      _id: "63701cc1f03239c72c000185",
      name: "Westbrook",
      email: "wsiddon6@state.tx.us",
      password: "PVfV72mNxb4",
      city: "Hanjiashu",
      state: null,
      country: "CN",
      occupation: "Quality Engineer",
      phoneNumber: "3096621613",
      transactions: [
        "63701d74f0323944410002fa",
        "63701d74f03239f09e0001ab",
        "63701d74f03239db6900014e",
        "63701d74f032395b33000158",
        "63701d74f032390a3400034c",
        "63701d74f0323986f3000151",
        "63701d74f0323986f3000145",
        "63701d74f03239867500012f",
        "63701d74f03239f09e0001ad",
      ],
      role: "superadmin",
    },
    {
      _id: "63701cc1f03239c72c000186",
      name: "Paola",
      email: "pledger7@freewebs.com",
      password: "L6mw336",
      city: "Xian’an",
      state: null,
      country: "CN",
      occupation: "Senior Quality Engineer",
      phoneNumber: "2982518057",
      transactions: [
        "63701d74f03239d81e000044",
        "63701d74f03239bef0000155",
        "63701d74f03239d81e00001e",
      ],
      role: "user",
    },
    {
      _id: "63701cc1f03239c72c000187",
      name: "Whit",
      email: "wrenols8@webeden.co.uk",
      password: "TnE8Lbb",
      city: "Oganlima",
      state: null,
      country: "ID",
      occupation: "Office Assistant IV",
      phoneNumber: "5967740518",
      transactions: [
        "63701d74f032395694000041",
        "63701d74f032395b33000144",
        "63701d74f032398675000130",
        "63701d74f032399c00000154",
        "63701d74f03239d81e000020",
        "63701d74f03239f09e000196",
        "63701d74f03239d591000349",
      ],
      role: "superadmin",
    },
    {
      _id: "63701cc1f03239c72c000188",
      name: "Shayna",
      email: "sradcliffe9@nytimes.com",
      password: "S7uupsmLnj6",
      city: "Longshan",
      state: null,
      country: "CN",
      occupation: "Analog Circuit Design manager",
      phoneNumber: "6052810930",
      transactions: [
        "63701d74f0323986f3000152",
        "63701d74f032399c0000014b",
        "63701d74f03239867500015b",
        "63701d74f03239cdc500002c",
        "63701d74f0323986f3000134",
        "63701d74f03239cdc5000032",
      ],
      role: "superadmin",
    },
    {
      _id: "63701cc1f03239c72c000189",
      name: "Donnamarie",
      email: "dkelfa@cam.ac.uk",
      password: "VygsdES",
      city: "Buraen",
      state: null,
      country: "ID",
      occupation: "Food Chemist",
      phoneNumber: "8395198999",
      transactions: [
        "63701d74f0323986f3000131",
        "63701d74f032399c0000014c",
        "63701d74f03239db69000133",
        "63701d74f03239bef000013c",
        "63701d74f03239bef0000147",
        "63701d74f03239b913000040",
      ],
      role: "superadmin",
    },
    {
      _id: "63701cc1f03239c72c00018a",
      name: "Felice",
      email: "fleivesleyb@liveinternet.ru",
      password: "vDE7jo",
      city: "Hrušica",
      state: null,
      country: "SI",
      occupation: "Administrative Assistant III",
      phoneNumber: "2401478620",
      transactions: [
        "63701d74f03239d81e00003a",
        "63701d74f03239cdc5000037",
        "63701d74f03239cdc5000046",
        "63701d74f03239cdc5000045",
        "63701d74f03239d40b00005d",
        "63701d74f03239528f000041",
      ],
      role: "user",
    },
  ]
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];
  return (
    <Box m="20px">
      <FlexBetween>
        <Header title="Dashboard" subtitle="Your Dashboard"></Header>
        <Box>
          <Button
            sx={{
              bgcolor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* Row 1 */}
        <StatBox
          title="Total Students"
          value={data && data.totalStudents}
          increase="+14%"
          description="last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        ></StatBox>
        <StatBox
          title="Total Fees Collected"
          value={data && data.totalFeesCollected}
          increase="+2%"
          description="monthly"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        ></StatBox>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          bgcolor={theme.palette.background.alt}
          p="0.2 rem"
          borderRadius="0.55rem"
        >
          <OverviewChart isDashboard={true}></OverviewChart>
        </Box>
        <StatBox
          title="Total Teachers"
          value={data && data.totalTeachers}
          increase="+1%"
          description="slight increase"
          icon={
            <Person2Outlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        ></StatBox>
        <StatBox
          title="Active Branches"
          value="5"
          increase="+1%"
          description="Owner"
          icon={
            <HouseOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        ></StatBox>
        {/* Row 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          bgcolor={theme.palette.background.alt}
          p="0.4rem"
          borderRadius="0.55rem"
          height="550px"
        >
          <FlexBetween>
            <Typography
              sx={{ color: theme.palette.secondary[200], fontWeight: "bold" }}
            >
              Funds Collected
            </Typography>
            <MonetizationOn sx={{ color: theme.palette.secondary[300] }} />
          </FlexBetween>

          <BreakdownChart></BreakdownChart>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          bgcolor={theme.palette.background.alt}
          p="0.4rem"
          borderRadius="0.55rem"
          height="550px"
        >
          <DataGrid
        loading={isLoading || !data4}
        getRowId={(row)=>row._id }
        rows={data4 || []}
        columns={columns}
      
        />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
