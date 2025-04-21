import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, Box, CircularProgress, useTheme } from "@mui/material";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://wt-cp-tution-mgmt-8.onrender.com/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Signup successful. Please log in.");
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh"
            bgcolor={theme.palette.background.alt}
        >
            <Paper elevation={3} sx={{ padding: 4, width: 350, textAlign: "center", bgcolor: theme.palette.background }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Create an Account
                </Typography>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <TextField
                        label="Username"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
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
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Sign Up"}
                    </Button>
                    <Typography 
                        sx={{ color: theme.palette.secondary[200], cursor: "pointer", mt: 2 }} 
                        onClick={() => navigate("/login")}
                    >
                        Already have an account? Log in
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default Signup;