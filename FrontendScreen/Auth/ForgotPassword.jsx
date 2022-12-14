import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CtaButton from "../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputField,
  InputLabel,
} from "../../components/Core/Form/FormGroup";
import Typography from "../../components/Core/Typography/Typography";
import Box from "../../components/Core/Box/Box";
import useToaster from "../../hooks/useToaster";
import { useUserAuth } from "./Context/UserAuthContext";
import inputRestrictions from "../../components/InputRestrictions/inputRestrictions";
import usePasswordToggle from "../../hooks/usePasswordToggle";

const ForgotPassword = () => {
  // authentication states
  const [phone, setPhone] = useState({
    phone_number: "",
    new_password: "",
    confirm_password: "",
  });
  const { authentication, setUpRecaptha } = useUserAuth();
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(true);
  const [steps, setSteps] = useState(1);

  const navigate = useNavigate();

  // custom hook of toaster
  const toaster = useToaster();

  // custom hook of password toggle
  const [inputType, Icon] = usePasswordToggle();
  const [inputType2, Icon2] = usePasswordToggle();

  // forgot password handler
  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    const phoneFormat = /^[6-9]\d{9}$/;
    if (!phone.phone_number)
      toaster({ type: "error", content: "Phone Number is mandatory !" });
    else if (
      phone.phone_number.length > 10 ||
      phone.phone_number.length < 10 ||
      !phone.phone_number.toString().match(phoneFormat)
    )
      toaster({ type: "error", content: "Phone number is not valid !" });
    else {
      axios
        .get(
          `${import.meta.env.VITE_IP_URL}/api/availability/phone/${
            phone.phone_number
          }`
        )
        .then((res) => {
          if (res.data.data.rows !== 0) {
            otpGenerator(e);
          } else {
            toaster({
              type: "error",
              content: "This Phone Number is not registered !",
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

  // otp generator function
  const otpGenerator = async (e) => {
    e.preventDefault();
    setFlag(false);
    try {
      const response = await setUpRecaptha(`+91${phone.phone_number}`);
      setResult(response);
      toaster({ type: "success", content: "Otp Sent !" });
      setSteps(2);
      setFlag(true);
    } catch (err) {
      setFlag(true);
      toaster({ type: "error", content: err.message });
    }
  };
  // validate otp
  const validateOtp = async (e) => {
    e.preventDefault();
    let completeOtp = otp.join("");
    if (
      completeOtp === "" ||
      completeOtp === null ||
      completeOtp.length > 6 ||
      completeOtp.length < 6
    )
      toaster({ type: "error", content: "Please Enter Correct OTP !" });
    else {
      setFlag(false);
      try {
        await result.confirm(completeOtp);
        setTimeout(() => {
          toaster({ type: "success", content: "Otp Verified !" });
          setSteps(3);
        }, 800);
      } catch (err) {
        toaster({ type: "error", content: err.message });
        console.log(err.message);
      }
    }
  };

  const passwordChecker = () => {
    if (!phone.new_password)
      toaster({ type: "error", content: "Please Enter New Password !" });
    else if (phone.new_password.length < 8)
      toaster({ type: "error", content: "Password Should be 8 Characters !" });
    else if (!phone.confirm_password)
      toaster({ type: "error", content: "Please Enter Confirm Password !" });
    else if (phone.new_password !== phone.confirm_password)
      toaster({
        type: "error",
        content: "New & Confirm Password is Mismatched!",
      });
    else {
      axios
        .post(`${import.meta.env.VITE_IP_URL}/api/forgot-password/`, phone)
        .then((res) => {
          console.log(res);
          toaster({
            type: "success",
            content: res.data.data.successResult.message,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 800);
        })
        .catch((error) => {
          toaster({
            type: "error",
            content: error.response.data.data.errorResult.message,
          });
        });
    }
  };

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
        {/* Phone Number Validation */}
        {steps === 1 && (
          <FormGroup action="">
            <Typography
              component={"h2"}
              className="mb-5 text-2xl font-semibold"
            >
              Forgot Password
            </Typography>

            <Box className="mb-4">
              <Typography component={"label"} className="block mb-1">
                Phone No.
              </Typography>
              <InputField
                variant={"primary"}
                className={"w-full"}
                type="text"
                placeholder="Type here"
                autoComplete={"off"}
                name="phone_number"
                value={phone.phone_number}
                onChange={(e) =>
                  setPhone({ ...phone, phone_number: e.target.value })
                }
                onKeyPress={(e) =>
                  inputRestrictions({ evt: e, length: 10, string: false })
                }
              />
            </Box>
            <Box className="flex justify-center mt-5">
              <Box id="recaptcha-container" className="mt-3"></Box>
            </Box>

            <CtaButton
              className="px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-yellow-500"
              onClick={forgotPasswordHandler}
              disabled={!flag}
            >
              Submit
            </CtaButton>

            <Typography component={"p"} className="text-center mt-5">
              Already user ? &nbsp;
              <CtaButton
                className="text-primary hover-text-secondary"
                to="/login"
              >
                Sign in
              </CtaButton>
            </Typography>
          </FormGroup>
        )}
        {/* OTP Validation */}
        {steps === 2 && (
          <Box>
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
                        An OTP has been sent to your phone number ending with
                        XXX XXX
                        {phone.phone_number?.substr(
                          phone.phone_number.length - 4
                        )}
                      </Typography>

                      {otp.map((data, index) => {
                        return (
                          <InputField
                            className="otp-field mt-3 appearance-none w-24 border border-gray-200 bg-gray-100 rounded py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
                            type="text"
                            name="otp"
                            maxLength="1"
                            tabIndex={index + 1}
                            key={index}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            autoComplete={"off"}
                            placeholder={"-"}
                            onKeyPress={(e) =>
                              inputRestrictions({
                                evt: e,
                                length: 1,
                                string: false,
                              })
                            }
                            onKeyUp={(e) => inputFocus(e)}
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
                        {flag && (
                          <CtaButton
                            className="px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-yellow-500"
                            onClick={validateOtp}
                          >
                            Validate
                          </CtaButton>
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </FormGroup>
              </Box>
            </Box>
          </Box>
        )}
        {/* Password Validation */}
        {steps === 3 && (
          <Box>
            <Typography
              component={"h2"}
              className="mb-5 text-2xl font-semibold text-center"
            >
              Create Password
            </Typography>
            <InputLabel variant={"dark"} required={true}>
              New Password
            </InputLabel>
            <Box className="relative">
              <InputField
                name="newPassword"
                type={inputType}
                required=""
                variant={"primary"}
                placeholder="New Password"
                autoComplete={"off"}
                value={phone.new_password}
                onChange={(e) => {
                  setPhone({ ...phone, new_password: e.target.value });
                }}
                onKeyPress={(e) => inputRestrictions({ evt: e, length: 25 })}
              />
              <Typography className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer z-10">
                {Icon}
              </Typography>
            </Box>
            <InputLabel variant={"dark"} required={true} className={"mt-4"}>
              Confirm Password
            </InputLabel>
            <Box className="relative">
              <InputField
                name="confirmPassword"
                type={inputType2}
                required=""
                variant={"primary"}
                placeholder="Confirm Password"
                autoComplete={"off"}
                value={phone.confirm_password}
                onChange={(e) => {
                  setPhone({ ...phone, confirm_password: e.target.value });
                }}
                onKeyPress={(e) => inputRestrictions({ evt: e, length: 25 })}
              />
              <Typography className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer z-10">
                {Icon2}
              </Typography>
            </Box>
            <CtaButton
              className="px-4 py-2 mt-5 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-yellow-500"
              onClick={passwordChecker}
            >
              Submit
            </CtaButton>
          </Box>
        )}
      </Box>
      '
    </>
  );
};

export default ForgotPassword;
