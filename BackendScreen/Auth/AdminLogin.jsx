import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToaster from "../../hooks/useToaster";
import { loadSiteSettings } from "../../Services/Actions/siteSettingAction";
import { useDispatch, useSelector } from "react-redux";
import CtaButton from "../../../src/components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputLabel,
} from "../../components/Core/Form/FormGroup";
import Typography from "../../components/Core/Typography/Typography";
import Box from "../../components/Core/Box/Box";
import Image from "../../components/Core/Image/Image";
import usePasswordToggle from "../../hooks/usePasswordToggle";

import { useFormik } from "formik";
import { TextField } from "@mui/material";
import * as yup from "yup";
import "yup-phone";

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


const AdminLogin = () => {
  const { siteSettings } = useSelector((state) => state.siteSettingData);
  const navigate = useNavigate();

  // custom hook of toaster
  // eslint-disable-next-line
  const toaster = useToaster();
  const dispatch = useDispatch();

  // custom hook of password toggle
  const [inputType, Icon] = usePasswordToggle();
  const formik = useFormik({
    initialValues: {
      phone_number: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values,{setErrors}) => {
      axios
      .post(`${import.meta.env.VITE_IP_URL}/api/login/`, values)
      .then((res) => {
        localStorage.setItem(
          import.meta.env.VITE_ADMIN_AUTH,
          JSON.stringify(res.data?.data?.rows)
        );
        toaster({ type: "success", content: res.data?.data?.successResult });
        navigate("/dashboard/welcome");
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

  useEffect(() => {
    const user = localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH);
    if (user) {
      navigate("/dashboard/welcome");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(loadSiteSettings());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box className="min-h-full flex items-center justify-center py-36 px-4 sm:px-6 lg:px-8 bg-blue-100">
        <Box className="max-w-md w-full space-y-8">
          <Box>
            <CtaButton to="/">
              <Image
                className="mx-auto h-12 w-auto"
                source={`${import.meta.env.VITE_IP_URL}/${
                  siteSettings?.rows?.logo
                }`}
                alt={siteSettings?.rows?.site_title}
              />
            </CtaButton>
            <Typography
              component={"h2"}
              className="mt-6 text-center text-3xl font-extrabold text-primary"
            >
              Welcome to admin panel
            </Typography>
            <Typography
              component={"p"}
              className="mt-2 text-center text-sm text-primary"
            ></Typography>
          </Box>
          <FormGroup className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <Box className="rounded-md -space-y-px">
              <Box className="mb-5">
                <TextField
                  fullWidth
                  type={"number"}
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
              <Box className="mb-5 relative">
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

            <Box className="flex items-center justify-between">
              <Box className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <InputLabel
                  jsxFor={"remember-me"}
                  variant={"dark"}
                  className={"ml-2"}
                >
                  Remember me
                </InputLabel>
              </Box>

              <Box className="text-sm">
                <CtaButton
                  to="/forgot-password"
                  className="font-medium text-primary hover-text-secondary"
                >
                  
                  Forgot your password?
                </CtaButton>
              </Box>
            </Box>

            <Box>
              <CtaButton type="submit" variant={"primary"} className={"w-full"}>
                Log in
              </CtaButton>
            </Box>
          </FormGroup>
        </Box>
      </Box>
    </>
  );
};

export default AdminLogin;
