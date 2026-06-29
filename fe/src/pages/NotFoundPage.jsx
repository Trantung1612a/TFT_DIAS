import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <Typography variant="h1" fontWeight={700} color="primary">404</Typography>
    <Typography variant="h6" color="text.secondary">Page not found</Typography>
    <Button component={Link} to="/" variant="contained">Go Home</Button>
  </div>
);

export default NotFoundPage;
