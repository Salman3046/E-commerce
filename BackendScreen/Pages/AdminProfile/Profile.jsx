import React, { useEffect, useState } from "react";
import Box from "../../../components/Core/Box/Box";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputField,
  InputLabel,
} from "../../../components/Core/Form/FormGroup";
import Image from "../../../components/Core/Image/Image";
import Typography from "../../../components/Core/Typography/Typography";
import useImageUpload from "../../../hooks/useImageUpload";

import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  getSingleUser,
  updateUser,
} from "../../../Services/Actions/userAction";

const Profile = ({ toaster, user }) => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );

  const [adminData, setAdminData] = useState({
    first_name: "",
    last_name: "",
    profile_image: "",
    email: "",
    phone_number: "",
    gender: "",
    roles: "",
  });
  // custom hook of useImage Upload
  const [getImageFile, deleteImageFile] = useImageUpload();

  const [tempImages, setTempImages] = useState("");
  const dispatch = useDispatch();

  // inputs handler
  const onChangeHandler = (ev) => {
    let { name, value } = ev.target;
    setAdminData({ ...adminData, [name]: value });
  };

  // update data into database
  const submitChanges = (ev) => {
    ev.preventDefault();
    if (!adminData.first_name)
      toaster({ type: "error", content: "Please Fill First Name !" });
    else if (!adminData.last_name)
      toaster({ type: "error", content: "Please Fill Last Name !" });
    else if (!adminData.email)
      toaster({ type: "error", content: "Please Fill Email Address !" });
    else if (!adminData.profile_image)
      toaster({ type: "error", content: "Please Select Profile Image!" });
    else if (JSON.stringify(adminData) === JSON.stringify(user))
      toaster({
        type: "error",
        content: "Please Update Something Before Submit !",
      });
    else {
      // This code is used for file upload
      const formData = new FormData();
      formData.append("uploadFor", "profileImage");
      formData.append("images", adminData.profile_image);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      // Check image is updated or not
      adminData.profile_image?.name
        ? axios
            .post(
              `${import.meta.env.VITE_IP_URL}/api/uploadImages/`,
              formData,
              config
            )
            .then((res) => {
              adminData.profile_image = res.data?.images[0];
              dispatch(
                updateUser(adminData, adminData.id, userDataFromLocal?.token)
              );
              dispatch(
                getSingleUser(userDataFromLocal?.id, userDataFromLocal?.token)
              );
              toaster({
                type: "success",
                content: "Profile Updated successfully",
              });
            })
            .catch((err) => {
              toaster({
                type: "error",
                content: err.response.data.data.errorResult.message,
              });
            })
        : dispatch(
            updateUser(adminData, adminData.id, userDataFromLocal?.token)
          );
      dispatch(getSingleUser(userDataFromLocal?.id, userDataFromLocal?.token));
      toaster({ type: "success", content: "Profile Updated successfully" });
    }
  };

  useEffect(() => {
    user
      ? setAdminData(user)
      : setAdminData({
          first_name: "",
          last_name: "",
          profile_image: "",
          email: "",
          phone_number: "",
          gender: "",
          roles: "",
        });
    user ? setTempImages(user.profile_image) : setTempImages("");
  }, [user]);

  return (
    <>
      <Box.Main className="md:full lg:w-full px-0 sm:px-4">
        <Box className="mt-10 sm:mt-0">
          <Box className="md:grid md:gap-6 bg-red">
            <Box className="mt-5 md:mt-0 md:col-span-2">
              <FormGroup action="#" method="POST">
                <Box className="shadow overflow-hidden sm:rounded-md">
                  <Box className="px-4 py-5 bg-white sm:p-6">
                    <Box className="md:col-span-1">
                      <Box className="px-4 sm:px-0">
                        <Typography
                          component={"h3"}
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Personal Information
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="grid grid-cols-6 gap-6 mt-5">
                      <Box className="col-span-6 sm:col-span-3">
                        <InputLabel
                          jsxFor={"first-name"}
                          variant={"dark"}
                          required={true}
                        >
                          First name
                        </InputLabel>
                        <InputField
                          name={"first_name"}
                          type={"text"}
                          required={""}
                          variant={"primary"}
                          placeholder={"First Name"}
                          value={adminData.first_name}
                          onChange={onChangeHandler}
                          onKeyPress={(e) =>
                            inputRestrictions({ evt: e, length: 15 })
                          }
                        />
                      </Box>

                      <Box className="col-span-6 sm:col-span-3">
                        <InputLabel
                          jsxFor={"last-name"}
                          variant={"dark"}
                          required={true}
                        >
                          Last name
                        </InputLabel>
                        <InputField
                          name={"last_name"}
                          type={"text"}
                          required={""}
                          variant={"primary"}
                          placeholder={"Last Name"}
                          value={adminData.last_name}
                          onChange={onChangeHandler}
                          onKeyPress={(e) =>
                            inputRestrictions({ evt: e, length: 15 })
                          }
                        />
                      </Box>

                      <Box className="col-span-6 sm:col-span-6">
                        <InputLabel
                          jsxFor={"email-address"}
                          variant={"dark"}
                          required={true}
                        >
                          Email address
                        </InputLabel>
                        <InputField
                          name={"category_name"}
                          type={"text"}
                          required={""}
                          variant={"primary"}
                          placeholder={"Email Address"}
                          value={adminData.email}
                          onChange={onChangeHandler}
                          onKeyPress={(e) =>
                            inputRestrictions({ evt: e, length: 40 })
                          }
                        />
                      </Box>
                    </Box>
                    <Box className="px-3 py-5 bg-white sm:p-0 mt-5">
                      <Typography
                        component={"label"}
                        className="block text-sm font-medium text-gray-700 required"
                      >
                        Profile Image
                      </Typography>
                      <Box className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <Box className="space-y-1 text-center flex items-center flex-col">
                          {tempImages ? (
                            <>
                              <Image
                                className="mx-auto h-20 w-auto"
                                source={`${
                                  import.meta.env.VITE_IP_URL
                                }/${tempImages}`}
                                alt=""
                              />
                              <CtaButton
                                variant={"primary"}
                                onClick={() => setTempImages("")}
                              >
                                Change
                              </CtaButton>
                            </>
                          ) : (
                            <>
                              <ImageUploader
                                onFileAdded={(img) => {
                                  setAdminData({
                                    ...adminData,
                                    profile_image: getImageFile(img),
                                  });
                                }}
                                onFileRemoved={() => {
                                  setAdminData({
                                    ...adminData,
                                    profile_image: deleteImageFile(),
                                  });
                                }}
                              />
                              <Box className="flex text-sm text-gray-600">
                                <Typography
                                  component={"label"}
                                  jsxFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <Typography component={"p"} className="pl-1">
                                    Upload Image or drag and drop
                                  </Typography>
                                </Typography>
                              </Box>
                              <Typography
                                component={"p"}
                                className="text-xs text-gray-500"
                              >
                                {adminData.profile_image?.name
                                  ? adminData.profile_image?.name
                                  : "PNG, JPG and JPEG up to 10MB"}
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <CtaButton
                      variant={"primary"}
                      onClick={submitChanges}
                    >
                      Update
                    </CtaButton>
                  </Box>
                </Box>
              </FormGroup>
            </Box>
          </Box>
        </Box>
      </Box.Main>
    </>
  );
};

export default Profile;
