import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Students from "scenes/students";  
import Teachers from "scenes/teachers"
import Transaction from "scenes/transaction"
import Geography from "scenes/geography"
import Overview from "scenes/overview"
import Daily from "scenes/daily"
import Monthly from "scenes/monthly"
import Breakdown from "scenes/breakdown"
import Admin from "scenes/admins"
import Performance from "scenes/performance"
// import Login from "scenes/login"

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Layout will always wrap the content with Sidebar and Navbar */}
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={< Daily/>} />
              <Route path="/monthly" element={< Monthly/>} />
              <Route path="/breakdown" element={< Breakdown/>} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/performance" element={<Performance/>} />
              {/* <Route path="/login" element={<Login/>} /> */}
             

            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;