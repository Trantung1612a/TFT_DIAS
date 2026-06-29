import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Paper, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} className="p-8 w-full max-w-md">
      <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
        Sign in to TFT DIAS
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Sign In"}
        </Button>
      </form>
      <Typography mt={2} textAlign="center" variant="body2">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </Typography>
    </Paper>
  );
};

export default LoginPage;
