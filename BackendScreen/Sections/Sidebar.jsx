import React, { useEffect } from "react";
import sidebar from "./sidebarData";
import { NavLink, useNavigate } from "react-router-dom";
import useDropdownToggler from "../../hooks/useDropdownToggler";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../Services/Actions/userAction";

// MUI Icon
import LogoutIcon from "@mui/icons-material/Logout";

// MUI Import
import Button from "@mui/material/Button";
import useDialogBox from "../../hooks/useDialogBox";
import CtaButton from "../../components/Core/Cta/CtaButton";
import Typography from "../../components/Core/Typography/Typography";
import List from "../../components/Core/List/List";
import Box from "../../components/Core/Box/Box";

import MuiList from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Sidebar = () => {
  const [style, ddToggler] = useDropdownToggler();
  const [setPop, DialogBox] = useDialogBox();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

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

  // logout functionality
  const logoutHandler = () => {
    setTimeout(() => {
      localStorage.removeItem(import.meta.env.VITE_ADMIN_AUTH);
      navigate("/admin");
    }, 2000);
  };

  // auto logout functionality
  useEffect(() => {
    if (user?.errorResult?.message === "Please Provide Valid Token !") {
      localStorage.removeItem(import.meta.env.VITE_ADMIN_AUTH);
      navigate("/admin");
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
        <MuiList
          sx={{ width: "100%", maxWidth: 360, color: "white" }}
          component="nav"
          id="outlet-2"
          aria-labelledby="nested-list-subheader"
        >
          {sidebar
            .filter((side) => side.navbar !== "")
            .map((side, index) => {
              return side.child ? (
                <>
                  <ListItemButton
                    onClick={() => ddToggler(side.navbar)}
                    className="bg-primary text-white hover:text-white shadow-sm hover-bg-secondary"
                  >
                    <ListItemIcon sx={{ color: "white",minWidth:'20%' }}>
                      {side.icon}
                    </ListItemIcon>
                    <ListItemText primary={side.navbar} />
                    {style===side.navbar ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={style===side.navbar} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {side.child.map((child, ind) => {
                        return (
                          <NavLink
                            to={`/dashboard/${child.path}`}
                            className={({ isActive }) =>
                              isActive
                                ? "pl-1 block text-white bg-secondary"
                                : "pl-1 block text-white bg-primary shadow-sm hover-bg-secondary"
                            }
                          >
                            <ListItemButton key={ind}>
                              <ListItemIcon sx={{ color: "white",minWidth:'20%' }}>
                                {<KeyboardArrowRightIcon />}
                              </ListItemIcon>
                              <ListItemText primary={child.name} />
                            </ListItemButton>
                          </NavLink>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              ) : (
                <NavLink
                  to={`/dashboard/${side.path}`}
                  className={({ isActive }) =>
                    isActive
                      ? "px-1 block text-white bg-secondary"
                      : "px-1 block text-white bg-primary shadow-sm hover-bg-secondary"
                  }
                >
                  <ListItemButton >
                    <ListItemIcon sx={{ color: "white",minWidth:'20%' }}>
                      {side.icon}
                    </ListItemIcon>
                    <ListItemText primary={side.navbar} />
                  </ListItemButton>
                </NavLink>
              );
            })}
            <ListItemButton className='bg-primary text-white hover:text-white hover-bg-primary' onClick={() => setPop({ pop: true, content: "logout" })}>
                    <ListItemIcon sx={{ color: "white",minWidth:'20%' }}>
                      <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                  </ListItemButton>
        </MuiList>
       
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={logoutHandler}>Yes</Button>
      </DialogBox>
    </>
  );
};

export default Sidebar;
