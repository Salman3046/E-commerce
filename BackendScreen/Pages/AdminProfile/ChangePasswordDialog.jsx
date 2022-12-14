import React, { useState } from "react";

// MUI Import
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@mui/material";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import Box from "../../../components/Core/Box/Box";
import {
  InputField,
  InputLabel,
} from "../../../components/Core/Form/FormGroup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import inputRestrictions from "../../../components/InputRestrictions/inputRestrictions";
import usePasswordToggle from "../../../hooks/usePasswordToggle";
import Typography from "../../../components/Core/Typography/Typography";

const ChangePasswordDialog = ({ toaster, user, pop, setPop }) => {
  const [passwordChange, setPasswordChange] = useState({
    id: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );

  // custom hook of password toggle
  const [inputType, Icon] = usePasswordToggle();
  const [inputType2, Icon2] = usePasswordToggle();
  const [inputType3, Icon3] = usePasswordToggle();

  const navigate = useNavigate();
  // password change functionality
  const passwordChanger = (e) => {
    e.preventDefault();
    if (!passwordChange.current_password)
      toaster({ type: "error", content: "Please Enter Current Password !" });
    else if (!passwordChange.new_password)
      toaster({ type: "error", content: "Please Enter New Password !" });
    else if (passwordChange.new_password.length < 8)
      toaster({ type: "error", content: "Password Should be 8 Characters !" });
    else if (!passwordChange.confirm_password)
      toaster({ type: "error", content: "Please Enter Confirm Password !" });
    else if (passwordChange.new_password === passwordChange.current_password)
      toaster({
        type: "error",
        content: "Current & New Password both are same!",
      });
    else if (passwordChange.new_password !== passwordChange.confirm_password)
      toaster({
        type: "error",
        content: "New & Confirm Password is Mismatched!",
      });
    else {
      passwordChange.id = user?.id;
      axios
        .post(
          `${import.meta.env.VITE_IP_URL}/api/change_password/`,
          passwordChange,
          { headers: { Authorization: `Bearer ${userDataFromLocal?.token}` } }
        )
        .then((res) => {
          toaster({
            type: "success",
            content: "Password Changed Successfully. Please Login Again",
          });
          setPop(false);
          localStorage.removeItem(import.meta.env.VITE_ADMIN_AUTH);
          navigate("/admin");
        })
        .catch((error) => {
          toaster({
            type: "error",
            content: error.response.data.data.errorResult.message,
          });
        });
    }
  };

  const handleClose = () => {
    setPop(false);
  };

  return (
    <>
      <Dialog
        open={pop}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{`Change Password`}</DialogTitle>
        <DialogContent>
          {/* <Box className="shadow overflow-hidden sm:rounded-md"> */}
          <Box className="px-4 bg-white">
            <Box className="col-span-6 sm:col-span-6">
              <InputLabel
                jsxFor={"current-password"}
                variant={"dark"}
                required={true}
              >
                Current Password
              </InputLabel>
              <Box className="relative">
                <InputField
                  name={"current"}
                  type={inputType}
                  required={""}
                  variant={"primary"}
                  placeholder={"Current Password"}
                  value={passwordChange.current_password}
                  onChange={(e) => {
                    setPasswordChange({
                      ...passwordChange,
                      current_password: e.target.value,
                    });
                  }}
                  onKeyPress={(e) => inputRestrictions({ evt: e, length: 30 })}
                />
                <Typography className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer z-10">
                  {Icon}
                </Typography>
              </Box>
            </Box>
            <Box className="col-span-6 sm:col-span-6 mt-4">
              <InputLabel
                jsxFor={"new-password"}
                variant={"dark"}
                required={true}
              >
                New Password
              </InputLabel>
              <Box className="relative">
                <InputField
                  name={"new"}
                  type={inputType2}
                  required={""}
                  variant={"primary"}
                  placeholder={"New Password"}
                  value={passwordChange.new_password}
                  onChange={(e) => {
                    setPasswordChange({
                      ...passwordChange,
                      new_password: e.target.value,
                    });
                  }}
                  onKeyPress={(e) => inputRestrictions({ evt: e, length: 30 })}
                />
                <Typography className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer z-10">
                  {Icon2}
                </Typography>
              </Box>
            </Box>
            <Box className="col-span-6 sm:col-span-6 mt-4">
              <InputLabel
                jsxFor={"confirm-password"}
                variant={"dark"}
                required={true}
              >
                Confirm Password
              </InputLabel>
              <Box className="relative">
                <InputField
                  name={"confirm"}
                  type={inputType3}
                  required={""}
                  variant={"primary"}
                  placeholder={"Confirm Password"}
                  value={passwordChange.confirm_password}
                  onChange={(e) => {
                    setPasswordChange({
                      ...passwordChange,
                      confirm_password: e.target.value,
                    });
                  }}
                  onKeyPress={(e) => inputRestrictions({ evt: e, length: 30 })}
                />
                <Typography className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer z-10">
                  {Icon3}
                </Typography>
              </Box>
            </Box>
            <Box className="flex justify-center mb-3 mt-4">
              <CtaButton variant={"primary"} onClick={() => setPop(false)}>
                Cancel
              </CtaButton>

              <CtaButton
                type="submit"
                variant={"primary"}
                className={"ml-3"}
                onClick={passwordChanger}
              >
                Update
              </CtaButton>
            </Box>
          </Box>
          {/* </Box> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangePasswordDialog;
