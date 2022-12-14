import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useToaster from "../../../hooks/useToaster";
import useImageUpload from "../../../hooks/useImageUpload";
import {
  getSingleSlider,
  updateSlider,
} from "../../../Services/Actions/sliderAction";

import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputField,
  InputLabel,
} from "../../../components/Core/Form/FormGroup";
import Typography from "../../../components/Core/Typography/Typography";
import Image from "../../../components/Core/Image/Image";
import Status from "../../../components/StatusSelection/Status";
import Box from "../../../components/Core/Box/Box";
import Footer from "../../../components/Outlet/Footer";

const EditSlider = () => {
  const { id } = useParams();
  const [editSlider, setEditSlider] = useState({
    slider_image: "image.jpg",
    slider_link: "image_link",
    slider_status: "0",
  });
  const { slider } = useSelector((state) => state.sliderData);
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tempImage, setTempImage] = useState("");

  // custom hook of toaster
  const toaster = useToaster();

  // custom hook of useImage Upload
  const [getImageFile, deleteImageFile] = useImageUpload();

  // inputs handler
  const onChangeHandler = (ev) => {
    let { name, value } = ev.target;
    setEditSlider({ ...editSlider, [name]: value });
  };

  // edit slider into database
  const submitSlider = (ev) => {
    ev.preventDefault();

    if (!editSlider.slider_image)
      toaster({ type: "error", content: "Please Select Slider image!" });
    else if (!editSlider.slider_link)
      toaster({ type: "error", content: "Please Enter Slider Link !" });
    else if (!editSlider.slider_status)
      toaster({ type: "error", content: "Please Select Slider Status !" });
    else {
      // This code is used for file upload
      const formData = new FormData();
      formData.append("uploadFor", "slider");
      formData.append("images", editSlider.slider_image);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      // This code is used for file upload
      // Check if image is not update
      editSlider.slider_image?.name
        ? axios
            .post(
              `${import.meta.env.VITE_IP_URL}/api/uploadImages/`,
              formData,
              config
            )
            .then((res) => {
              editSlider.slider_image = res.data?.images[0];
              dispatch(updateSlider(editSlider, id, userDataFromLocal?.token));
              setEditSlider({
                slider_image: "",
                slider_link: "",
                slider_status: "",
              });
              toaster({
                type: "success",
                content: "Slider Update Successfully",
              });
              navigate("/dashboard/sliders");
            })
            .catch((err) => {
              toaster({
                type: "error",
                content: err.response.data.data.errorResult.message,
              });
            })
        : dispatch(updateSlider(editSlider, id, userDataFromLocal?.token));
      setEditSlider({ slider_image: "", slider_link: "", slider_status: "" });
      toaster({ type: "success", content: "Slider add successfully" });
      navigate("/dashboard/sliders");
    }
  };
  useEffect(() => {
    dispatch(getSingleSlider(id, userDataFromLocal?.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    slider?.rows
      ? setEditSlider(slider?.rows)
      : setEditSlider({
          slider_image: "image.jpg",
          slider_link: "image_link",
          slider_status: "0",
        });
    slider?.rows
      ? setTempImage(
          `${import.meta.env.VITE_IP_URL}/${slider?.rows?.slider_image}`
        )
      : setTempImage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slider]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Edit Slider
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <InputLabel variant={"dark"} required={true}>
                Slider Image
              </InputLabel>
              <Box className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <Box className="space-y-1 text-center flex items-center flex-col">
                  {tempImage ? (
                    <>
                      <Image
                        className="mx-auto h-20 w-auto"
                        source={tempImage}
                        alt=""
                      />
                      <CtaButton
                        variant={"primary"}
                        className={"mt-2"}
                        onClick={() => setTempImage("")}
                      >
                        Change
                      </CtaButton>
                    </>
                  ) : (
                    <>
                      <ImageUploader
                        onFileAdded={(img) => {
                          setEditSlider({
                            ...editSlider,
                            slider_image: getImageFile(img),
                          });
                        }}
                        onFileRemoved={() => {
                          setEditSlider({
                            ...editSlider,
                            slider_image: deleteImageFile(),
                          });
                        }}
                      />
                      <Box className="flex text-sm text-gray-600">
                        <InputLabel
                          jsxFor="file-upload"
                          variant="dark"
                          required={true}
                        >
                          <Typography component={"p"} className="pl-1">
                            Upload Image or drag and drop
                          </Typography>
                        </InputLabel>
                      </Box>
                      <Typography
                        component={"p"}
                        className="text-xs text-gray-500"
                      >
                        {editSlider.slider_image?.name
                          ? editSlider.slider_image?.name
                          : "PNG, JPG and JPEG up to 10MB"}
                      </Typography>
                    </>
                  )}
                  <InputLabel variant={"dark"}>
                    Preferred Slider Size is (1903px x 712px)
                  </InputLabel>
                </Box>
              </Box>
            </Box>
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Slider Link
                  </InputLabel>
                  <InputField
                    name="slider_link"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Slider Link"
                    value={editSlider.slider_link}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="col-span-6 sm:col-span-3">
                <InputLabel variant={"dark"} required={true}>
                  Status
                </InputLabel>
                <Status
                  name="slider_status"
                  value={slider.slider_status}
                  onChange={onChangeHandler}
                />
              </Box>
            </Box>

            <Footer
              to={"/dashboard/sliders"}
              onClick={submitSlider}
              text={"Update"}
            />
          </Box>
        </FormGroup>
      </Box.Section>
      '
    </>
  );
};

export default EditSlider;
