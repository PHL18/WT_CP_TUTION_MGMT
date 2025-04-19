import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "state/GlobalSlice";
import { useNavigate } from "react-router-dom";
import { useGetLoginMutation } from "state/api"; // API call for login
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { AppRegistrationOutlined, Brightness4, Brightness7 } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || "light"
  ); // Load saved theme
  const [loginUser, { isLoading }] = useGetLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // Create theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          ...(themeMode === "dark"
            ? {
                background: { default: "#191F45;", alt: "#21295c", dark: "#333" },
                text: { primary: "#fff" },
              }
            : {
                background: { default: "#f5f5f5", alt: "#ffffff", dark: "#e0e0e0" },
                text: { primary: "#000" },
              }),
        },
      }),
    [themeMode]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      // Make API call to backend
      const response = await loginUser({ email, password }).unwrap();

      // Save user in Redux store
      dispatch(setUser({ user: response.user, token: response.token }));

      // Save token in local storage
      localStorage.setItem("token", response.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.data?.message || "Invalid email or password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor={theme.palette.background.default}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: 350,
            textAlign: "center",
            bgcolor: theme.palette.background.alt,
            color: theme.palette.text.primary,
          }}
        >
          {/* Theme Toggle Button */}
          <IconButton onClick={toggleTheme} sx={{ mb: 2,}}>
            {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Login
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Typography
              sx={{ color: theme.palette.text.primary, cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Typography>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Login;