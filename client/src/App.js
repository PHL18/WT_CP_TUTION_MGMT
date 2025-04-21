import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Students from "scenes/students";  
import Teachers from "scenes/teachers";
import Transaction from "scenes/transaction";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admins";
import Performance from "scenes/performance";
import Login from "scenes/login";
import SignUp from "scenes/signup";
import { useState, useEffect } from "react";

function PrivateRoute({ element }) {
  const isAuthenticated = localStorage.getItem("token"); // Example authentication check

  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // Track authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulating authentication check from localStorage
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

         
            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />

            
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
              <Route path="/students" element={<PrivateRoute element={<Students />} />} />
              <Route path="/teachers" element={<PrivateRoute element={<Teachers />} />} />
              <Route path="/transactions" element={<PrivateRoute element={<Transaction />} />} />
              <Route path="/geography" element={<PrivateRoute element={<Geography />} />} />
              <Route path="/overview" element={<PrivateRoute element={<Overview />} />} />
              <Route path="/daily" element={<PrivateRoute element={<Daily />} />} />
              <Route path="/attendance" element={<PrivateRoute element={<Monthly />} />} />
              <Route path="/breakdown" element={<PrivateRoute element={<Breakdown />} />} />
              <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
              <Route path="/performance" element={<PrivateRoute element={<Performance />} />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;