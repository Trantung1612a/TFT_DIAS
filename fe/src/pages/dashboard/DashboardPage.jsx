import { useAuth } from "../../context/AuthContext";
import { Typography, Paper, Grid } from "@mui/material";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Welcome, {user?.fullName}
      </Typography>
      <Grid container spacing={3}>
        {[
          { label: "Total Users", value: "—" },
          { label: "Active Sessions", value: "—" },
          { label: "Reports", value: "—" },
          { label: "Notifications", value: "—" },
        ].map(({ label, value }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <Paper elevation={2} className="p-6 text-center">
              <Typography variant="h4" fontWeight={700} color="primary">
                {value}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DashboardPage;
