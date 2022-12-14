import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToaster from "../../hooks/useToaster";
import axios from "axios";
import CtaButton from "../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputLabel,
} from "../../components/Core/Form/FormGroup";
import Typography from "../../components/Core/Typography/Typography";
import Box from "../../components/Core/Box/Box";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import * as yup from "yup";
import "yup-phone";
import { useUserAuth } from "./Context/UserAuthContext";

// validation schema for sign in
const validationSchema = yup.object({
  phone_number: yup.string()
    .phone("IN",true,"Phone Number must be a valid phone number.")
    .required("Phone Number is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignIn = () => {
    const {authentication,setAuthentication}=useUserAuth();
  const formik = useFormik({
    initialValues: {
      phone_number: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values,{setErrors}) => {
        axios
        .post(`${import.meta.env.VITE_IP_URL}/api/customer/login/`, values)
        .then((res) => {
          localStorage.setItem(
            import.meta.env.VITE_USER_AUTH,
            JSON.stringify(res.data?.data?.rows)
          );
          setAuthentication(true)
          toaster({ type: "success", content: res.data?.data?.successResult });
            navigate('/user/account-settings');
        })
        .catch((err) => {
          toaster({
            type: "error",
            content: err?.response.data?.data?.errorResult?.message,
          });
          setErrors({phone_number:true,password:true})
        });
    },
  });
  const navigate = useNavigate();
  // custom hook of toaster
  const toaster = useToaster();
  // custom hook of password toggle
  const [inputType, Icon] = usePasswordToggle();

  // if user is already login it will redirect to account
  useEffect(() => {
    if (authentication) {
      navigate("/user/account-settings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        style={{ maxWidth: "460px" }}
        className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
      >
        <FormGroup onSubmit={formik.handleSubmit}>
          <Typography component={"h2"} className="mb-5 text-2xl font-semibold">
            Sign in
          </Typography>

          <Box className="mb-4">
            <TextField
              fullWidth
              type={'number'}
              size={"small"}
              id="phone_number"
              name="phone_number"
              label="Phone Number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              error={
                formik.touched.phone_number &&
                Boolean(formik.errors.phone_number)
              }
              helperText={
                formik.touched.phone_number && formik.errors.phone_number
              }
            />
          </Box>

          <Box className="mb-4">
            <Box className="relative">
              <TextField
                fullWidth
                id="password"
                size={"small"}
                name="password"
                label="Password"
                type={inputType}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Typography className="absolute inset-y-0 inline-flex items-center right-4 top-2 cursor-pointer z-10 password-icon">
                {Icon}
              </Typography>
            </Box>
          </Box>
          <Box className="flex justify-between">
            <InputLabel className="flex items-center justify-between w-max mb-5">
              <Box>
                <input
                  checked=""
                  name=""
                  type="checkbox"
                  className="h-4 w-4"
                  readOnly
                />
                <Typography className="ml-2 inline-block text-gray-500">
                  Remember me
                </Typography>
              </Box>
            </InputLabel>
            <Box>
              <CtaButton
                to="/forgot-password"
                className="text-primary hover-text-secondary"
              >
                Forgot Password ?
              </CtaButton>
            </Box>
          </Box>

          <CtaButton
            type="submit"
            variant={"primary"}
            className={"w-full px-2"}
          >
            Sign in
          </CtaButton>

          <Typography component={"p"} className="text-center mt-5">
            Don’t have an account?
            <CtaButton
              className="text-primary hover-text-secondary"
              to="/register"
            >
              Sign up
            </CtaButton>
          </Typography>
        </FormGroup>
      </Box>
      '
    </>
  );
};

export default SignIn;
