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
    <header className="h-16 bg-white shadow-sm flex items-center justify-end px-6">
      <IconButton onClick={(e) => setAnchor(e.currentTarget)} size="small">
        <Avatar src={user?.avatar} alt={user?.fullName} sx={{ width: 36, height: 36 }}>
          {user?.fullName?.[0]}
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem disabled>{user?.fullName}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
