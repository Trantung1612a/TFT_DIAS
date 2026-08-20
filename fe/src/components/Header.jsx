import { useAuth } from "../context/AuthContext";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="h-16 flex items-center justify-end px-6 shrink-0"
      style={{
        background: "#1A1C29",
        borderBottom: "1px solid rgba(200,155,60,0.15)",
      }}
    >
      <IconButton
        onClick={(e) => setAnchor(e.currentTarget)}
        size="small"
        sx={{
          border: "1px solid rgba(200,155,60,0.25)",
          borderRadius: "8px",
          padding: "4px",
          "&:hover": {
            border: "1px solid rgba(200,155,60,0.55)",
            boxShadow: "0 0 12px rgba(200,155,60,0.2)",
          },
        }}
      >
        <Avatar
          src={user?.avatar}
          alt={user?.fullName}
          sx={{
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #C89B3C, #8A6B28)",
            color: "#0B0C10",
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          {user?.fullName?.[0]}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        PaperProps={{
          sx: {
            background: "rgba(13,15,25,0.97)",
            border: "1px solid rgba(200,155,60,0.3)",
            borderRadius: "8px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(200,155,60,0.1)",
            backdropFilter: "blur(16px)",
            minWidth: "180px",
            mt: 1,
          },
        }}
      >
        <MenuItem
          disabled
          sx={{
            color: "#A89880 !important",
            fontFamily: "'Cinzel', Georgia, serif !important",
            fontSize: "11px !important",
            letterSpacing: "0.05em",
          }}
        >
          {user?.fullName}
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "#8C1616",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            "&:hover": {
              background: "rgba(140,22,22,0.12)",
              color: "#C44",
            },
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
