import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

// MUI Import
import Button from "@mui/material/Button";
import useDialogBox from "../../hooks/useDialogBox";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../Services/Actions/userAction";

const AdminAvatar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  // custom hook of dialog box
  const [setPop, DialogBox] = useDialogBox();

  // logout functionality
  const logoutHandler = () => {
    localStorage.removeItem(import.meta.env.VITE_ADMIN_AUTH);
    navigate("/admin");
  };

  useEffect(() => {
    const userDataFromLocal = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
    );
    if (!userDataFromLocal) {
      navigate("/admin");
    } else {
      dispatch(getSingleUser(userDataFromLocal?.id, userDataFromLocal?.token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {user?.profile_image ? (
              <Avatar
                alt={`${user?.first_name} ${user?.last_name}`}
                src={`${import.meta.env.VITE_IP_URL}/${user?.profile_image}`}
              />
            ) : (
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.first_name?.charAt(0)}
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/dashboard/admin/profile");
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => setPop({ pop: true, content: "logout" })}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={logoutHandler}>Yes</Button>
      </DialogBox>
    </>
  );
};

export default AdminAvatar;
