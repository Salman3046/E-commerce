import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSiteSettings } from "../../Services/Actions/siteSettingAction";
import useToaster from "../../hooks/useToaster";

import { useUserAuth } from "./Context/UserAuthContext";
import axios from "axios";
import CtaButton from "../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputField,
  InputLabel,
} from "../../components/Core/Form/FormGroup";
import Typography from "../../components/Core/Typography/Typography";
import inputRestrictions from "../../components/InputRestrictions/inputRestrictions";
import usePasswordToggle from "../../hooks/usePasswordToggle";

const SignUp = () => {
  // user state all user's data will stored in this state
  const [user, setUser] = useState({
    phone_number: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    roles: JSON.stringify({ User: 2001 }),
    status: 1,
  });

  const { authentication, setAuthentication } = useUserAuth();

  // one more state for store some additional information
  const [additionalInfo, setAdditionInfo] = useState({
    phoneCode: "+91",
    otp: "",
    confirmPassword: "",
    tnc: false,
  });

  // authentication states
  const { setUpRecaptha } = useUserAuth();
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);

  // custom hook of toaster
  const toaster = useToaster();

  // custom hook of password toggle
  const [inputType, Icon] = usePasswordToggle();
  const [inputType2, Icon2] = usePasswordToggle();

  // get site settings
  const { siteSettings } = useSelector((state) => state.siteSettingData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // otp box
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
  };

  const inputFocus = (element) => {
    if (element.key === "Delete" || element.key === "Backspace") {
      const next = element.target.tabIndex - 2;
      if (next > -1) {
        element.target.form.elements[next].focus();
      }
    } else {
      const next = element.target.tabIndex;
      if (next < 6 && element.target.value) {
        element.target.form.elements[next].focus();
      }
    }
  };

  // Header label of stepper
  const steps = [
    "Phone Verification",
    "OTP Verification",
    "Email Verification",
    "Personal Details",
  ];

  // stepper's functions and states
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 2;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setUser({ ...user, email: "" });
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  // input's Handler
  const onChangeHandler = (ev) => {
    let { name, value } = ev.target;
    setUser({ ...user, [name]: value });
  };

  // otp generator function
  const otpGenerator = async (e) => {
    e.preventDefault();
    setFlag(true);
    let newSkipped = skipped;
    try {
      const response = await setUpRecaptha(
        `${additionalInfo.phoneCode}${user.phone_number}`
      );
      setResult(response);
      setTimeout(() => {
        toaster({ type: "success", content: "Otp Sent !" });
      }, 500);
      setTimeout(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }, 2000);
    } catch (err) {
      setFlag(false);
      toaster({ type: "error", content: err.message });
    }
  };

  // validate phone number
  const validatePhone = async (e) => {
    e.preventDefault();
    const phoneFormat = /^[6-9]\d{9}$/;
    if (!user.phone_number)
      toaster({ type: "error", content: "Phone Number is mandatory !" });
    else if (
      user.phone_number.length > 10 ||
      user.phone_number.length < 10 ||
      !user.phone_number.toString().match(phoneFormat)
    )
      toaster({ type: "error", content: "Phone number is not valid !" });
    else {
      axios
        .get(
          `${import.meta.env.VITE_IP_URL}/api/availability/phone/${
            user.phone_number
          }`
        )
        .then((res) => {
          if (res.data.data.rows === 0) {
            otpGenerator(e);
          } else {
            toaster({
              type: "error",
              content: "This Phone Number is Already Registered !",
            });
          }
        })
        .catch((err) => {
          toaster({
            type: "error",
            content: err.response.data.errorResult.message,
          });
        });
    }
  };

  // validate otp
  const validateOtp = async (e) => {
    e.preventDefault();
    let newSkipped = skipped;
    let completeOtp = otp.join("");
    if (
      completeOtp === "" ||
      completeOtp === null ||
      completeOtp.length > 6 ||
      completeOtp.length < 6
    )
      toaster({ type: "error", content: "Please Enter Correct OTP !" });
    else {
      try {
        await result.confirm(completeOtp);
        setTimeout(() => {
          toaster({ type: "success", content: "Otp Verified !" });
        }, 800);
        setTimeout(() => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
        }, 2000);
      } catch (err) {
        toaster({ type: "error", content: err.message });
        console.log(err.message);
      }
    }
  };

  // validate email
  const validateEmail = () => {
    let newSkipped = skipped;
    const mailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!user.email)
      toaster({ type: "error", content: "Please Enter Email Address !" });
    else if (!user.email.match(mailFormat))
      toaster({ type: "error", content: "Please Enter Valid Email Address !" });
    else {
      axios
        .get(
          `${import.meta.env.VITE_IP_URL}/api/availability/email/${user.email}`
        )
        .then((res) => {
          if (res.data.data.rows === 0) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
          } else {
            toaster({
              type: "error",
              content: "This Email Address is Already Registered !",
            });
          }
        })
        .catch((err) => {
          toaster({
            type: "error",
            content: err.response.data.errorResult.message,
          });
        });
    }
  };

  // register user's data into database
  const submitUser = () => {
    if (!user.first_name || !user.last_name)
      toaster({
        type: "error",
        content: "First Name & Last Name is mandatory !",
      });
    else if (!user.password)
      toaster({ type: "error", content: "Password is mandatory !" });
    else if (user.password.length < 8)
      toaster({
        type: "error",
        content: "password should be at least 8 characters !",
      });
    else if (!additionalInfo.confirmPassword)
      toaster({ type: "error", content: "Please Enter Confirm Password !" });
    else if (user.password !== additionalInfo.confirmPassword)
      toaster({ type: "error", content: "Password is mismatched !" });
    else if (!additionalInfo.tnc)
      toaster({
        type: "error",
        content: "Please agree to the terms and conditions !",
      });
    else {
      axios
        .post(`${import.meta.env.VITE_IP_URL}/api/register/`, user)
        .then((res) => {
          const rows = {
            id: res.data?.data?.successResult?.row,
            token: res.data?.data?.successResult?.token,
          };
          localStorage.setItem(
            import.meta.env.VITE_USER_AUTH,
            JSON.stringify(rows)
          );
          setAuthentication(true);
          toaster({
            type: "success",
            content: res.data?.data?.successResult?.message,
          });
          setTimeout(() => {
            navigate("/user/account-settings");
          }, 2000);
        })
        .catch((err) => {
          toaster({
            type: "error",
            content: err?.response?.data?.errorResult?.message,
          });
        });
    }
  };

  useEffect(() => {
    dispatch(loadSiteSettings());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authentication) {
      navigate("/user/account-settings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box className="w-full mx-auto sm:w-2/3">
        <Typography
          component={"h2"}
          className="mb-5 text-2xl font-semibold text-center"
        >
          Sign up to {siteSettings?.rows?.site_title}
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Box className="w-full mx-auto mt-10 mb-20 p-4 md:p-7 rounded bg-white shadow-lg sm:w-2/3">
            <React.Fragment>
              {activeStep === 0 ? (
                <MuiTypography
                  sx={{ mt: 2, mb: 1 }}
                  component={"span"}
                  variant={"body2"}
                >
                  <Typography
                    component={"h2"}
                    className="mb-5 text-2xl font-semibold text-center"
                  >
                    Phone Number Verification
                  </Typography>
                  <Box className="mb-4">
                    <InputLabel className="block mb-1">
                      {" "}
                      Phone Number
                    </InputLabel>
                    <Box className="flex  w-full">
                      <InputField
                        className="appearance-none w-14 border border-gray-200 bg-gray-100 rounded-tl-md rounded-bl-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
                        type="text"
                        placeholder="Code"
                        value={additionalInfo.phoneCode}
                        readOnly
                      />
                      <InputField
                        className="appearance-none flex-1 border border-gray-200 bg-gray-100 rounded-tr-md rounded-br-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
                        type="text"
                        name="phone_number"
                        placeholder="Type Phone Number"
                        autoComplete={"off"}
                        value={user.phone_number}
                        onChange={onChangeHandler}
                        onKeyPress={(e) =>
                          inputRestrictions({
                            evt: e,
                            length: 10,
                            string: false,
                          })
                        }
                      />
                    </Box>
                    <Box className="flex justify-center mt-5">
                      <Box id="recaptcha-container" className="mt-3"></Box>
                    </Box>
                  </Box>
                </MuiTypography>
              ) : activeStep === 1 ? (
                <MuiTypography
                  sx={{ mt: 2, mb: 1 }}
                  component={"span"}
                  variant={"body2"}
                >
                  <Typography
                    component={"h2"}
                    className="mb-5 text-2xl font-semibold text-center"
                  >
                    Enter OTP
                  </Typography>
                  <Box className="mb-4">
                    <Box className="flex justify-center w-full">
                      <FormGroup>
                        <Box className="row">
                          <Box className="col text-center">
                            <Typography component={"p"}>
                              An OTP has been sent to your phone number ending
                              with XXX XXX{" "}
                              {user?.phone_number?.substr(
                                user.phone_number.length - 4
                              )}
                            </Typography>

                            {otp.map((data, index) => {
                              return (
                                <InputField
                                  name="otp"
                                  type="text"
                                  placeholder="-"
                                  autoComplete="off"
                                  className="otp-field mt-3 appearance-none w-24 border border-gray-200 bg-gray-100 rounded py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
                                  tabIndex={index + 1}
                                  maxLength="1"
                                  key={index}
                                  value={data}
                                  onChange={(e) =>
                                    handleChange(e.target, index)
                                  }
                                  // onFocus={e => e.target.select()}
                                  onKeyUp={(e) => inputFocus(e)}
                                  onKeyPress={(e) => {
                                    e.target.value.length >= 1 &&
                                      e.preventDefault();
                                  }}
                                />
                              );
                            })}

                            <Typography
                              component={"p"}
                              className="mt-3 text-blue-700"
                            >
                              OTP Entered - {otp.join("")}
                            </Typography>
                            <Typography component={"p"}>
                              <CtaButton
                                className="btn btn-secondary mr-2 mt-3"
                                onClick={(e) => setOtp([...otp.map((v) => "")])}
                              >
                                Clear
                              </CtaButton>
                            </Typography>
                          </Box>
                        </Box>
                      </FormGroup>
                    </Box>
                  </Box>
                </MuiTypography>
              ) : activeStep === 2 ? (
                <MuiTypography
                  sx={{ mt: 2, mb: 1 }}
                  component={"span"}
                  variant={"body2"}
                >
                  <Typography
                    component={"h2"}
                    className="mb-5 text-2xl font-semibold"
                  >
                    Email Verification(Optional)
                  </Typography>
                  <Box className="mb-4">
                    <InputLabel className="block mb-1"> Email </InputLabel>
                    <InputField
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type here Email"
                      autoComplete={"off"}
                      name="email"
                      value={user.email}
                      onChange={onChangeHandler}
                      onKeyPress={(e) =>
                        e.target.value.length >= 25 && e.preventDefault()
                      }
                    />
                  </Box>
                </MuiTypography>
              ) : (
                activeStep === 3 && (
                  <MuiTypography
                    sx={{ mt: 2, mb: 1 }}
                    component={"span"}
                    variant={"body2"}
                  >
                    <Typography
                      component={"h2"}
                      className="mb-5 text-2xl font-semibold"
                    >
                      Personal Detail
                    </Typography>
                    <Box className="grid md:grid-cols-2 gap-x-2">
                      <Box className="mb-4">
                        <InputLabel className="block mb-1">
                          {" "}
                          First name{" "}
                        </InputLabel>
                        <InputField
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          type="text"
                          placeholder="Type here"
                          autoComplete={"off"}
                          name="first_name"
                          value={user.first_name}
                          onChange={onChangeHandler}
                          onKeyPress={(e) =>
                            e.target.value.length >= 32 && e.preventDefault()
                          }
                        />
                      </Box>

                      <Box className="mb-4">
                        <InputLabel className="block mb-1">
                          {" "}
                          Last name{" "}
                        </InputLabel>
                        <InputField
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          name="last_name"
                          type="text"
                          autoComplete={"off"}
                          placeholder="Type here"
                          value={user.last_name}
                          onChange={onChangeHandler}
                          onKeyPress={(e) =>
                            e.target.value.length >= 32 && e.preventDefault()
                          }
                        />
                      </Box>
                    </Box>

                    <Box className="mb-4">
                      <InputLabel className="block mb-1">
                        {" "}
                        Create password{" "}
                      </InputLabel>
                      <Box className="relative">
                        <InputField
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          name="password"
                          type={inputType}
                          placeholder="Type here"
                          value={user.password}
                          onChange={onChangeHandler}
                          onKeyPress={(e) =>
                            e.target.value.length >= 25 && e.preventDefault()
                          }
                        />
                        <Typography className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer z-10">
                          {Icon}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="mb-4">
                      <InputLabel className="block mb-1">
                        {" "}
                        Confirm password{" "}
                      </InputLabel>
                      <Box className="relative">
                        <InputField
                          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          type={inputType2}
                          autoComplete={"off"}
                          placeholder="Type here"
                          value={additionalInfo.confirmPassword}
                          onChange={(e) => {
                            setAdditionInfo({
                              ...additionalInfo,
                              confirmPassword: e.target.value,
                            });
                          }}
                          onKeyPress={(e) =>
                            e.target.value.length >= 25 && e.preventDefault()
                          }
                        />
                        <Typography className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer z-10">
                          {Icon2}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      component={"label"}
                      className="flex items-center w-max my-4"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        onChange={() =>
                          additionalInfo.tnc
                            ? setAdditionInfo({ ...additionalInfo, tnc: false })
                            : setAdditionInfo({ ...additionalInfo, tnc: true })
                        }
                      />
                      <Typography className="ml-2 inline-block">
                        {" "}
                        I agree with{" "}
                        <CtaButton
                          to="/terms-conditions"
                          className="text-primary hover-text-secondary"
                        >
                          Terms and Conditions
                        </CtaButton>{" "}
                      </Typography>
                    </Typography>
                  </MuiTypography>
                )
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                {activeStep === 0 ? (
                  !flag && <Button onClick={validatePhone}>Send Otp</Button>
                ) : activeStep === 1 ? (
                  <Button onClick={validateOtp}>Validate</Button>
                ) : activeStep === 2 ? (
                  <Button onClick={validateEmail}>Next</Button>
                ) : (
                  activeStep === 3 && (
                    <Button onClick={submitUser}>Finish</Button>
                  )
                )}
              </Box>
            </React.Fragment>
          </Box>
        </Box>

        <hr />

        <Typography component={"p"} className="text-center mt-3">
          Already have an account? &nbsp;
          <CtaButton className="text-blue-500" to="/login">
            Sign in
          </CtaButton>
        </Typography>
      </Box>
      '
    </>
  );
};

export default SignUp;
