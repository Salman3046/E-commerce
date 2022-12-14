import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { addSlider } from "../../../Services/Actions/sliderAction";
import { useDispatch } from "react-redux";
import useToaster from "../../../hooks/useToaster";

import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import useImageUpload from "../../../hooks/useImageUpload";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputField,
  InputLabel,
} from "../../../components/Core/Form/FormGroup";
import Typography from "../../../components/Core/Typography/Typography";
import Status from "../../../components/StatusSelection/Status";
import Box from "../../../components/Core/Box/Box";
import Footer from "../../../components/Outlet/Footer";

const AddSlider = () => {
  const [slider, setSlider] = useState({
    slider_image: "",
    slider_link: "",
    slider_status: "",
  });

  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // custom hook of toaster
  const toaster = useToaster();

  // custom hook of useImage Upload
  const [getImageFile, deleteImageFile] = useImageUpload();

  // inputs handler
  const onChangeHandler = (ev) => {
    let { name, value } = ev.target;
    setSlider({ ...slider, [name]: value });
  };

  // store slider into database
  const submitSlider = (ev) => {
    ev.preventDefault();

    if (!slider.slider_image)
      toaster({ type: "error", content: "Please Select Slider image!" });
    else if (!slider.slider_link)
      toaster({ type: "error", content: "Please Enter Slider Link !" });
    else if (!slider.slider_status)
      toaster({ type: "error", content: "Please Select Slider Status !" });
    else {
      // This code is used for file upload
      const formData = new FormData();
      formData.append("uploadFor", "slider");
      formData.append("images", slider.slider_image);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      // This code is used for file upload
      axios
        .post(
          `${import.meta.env.VITE_IP_URL}/api/uploadImages/`,
          formData,
          config
        )
        .then((res) => {
          slider.slider_image = res.data?.images[0];
          dispatch(addSlider(slider, userDataFromLocal.token));
          setSlider({ slider_image: "", slider_link: "", slider_status: "" });
          toaster({
            type: "success",
            content: "Slider add successfully",
          });
          navigate("/dashboard/sliders");
        })
        .catch((err) => {
          toaster({
            type: "error",
            content: err.response.data.data.errorResult.message,
          });
        });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Add Slider
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <InputLabel variant={"dark"} required={true}>
                Slider Image
              </InputLabel>
              <Box className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <Box className="space-y-1 text-center flex items-center flex-col">
                  <ImageUploader
                    onFileAdded={(img) => {
                      setSlider({ ...slider, slider_image: getImageFile(img) });
                    }}
                    onFileRemoved={() => {
                      setSlider({ ...slider, slider_image: deleteImageFile() });
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
                  <Typography component={"p"} className="text-xs text-gray-500">
                    {slider.slider_image?.name
                      ? slider.slider_image?.name
                      : "PNG, JPG and JPEG up to 10MB"}
                  </Typography>
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
                    value={slider.slider_link}
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
              text={"Add"}
            />
          </Box>
        </FormGroup>
      </Box.Section>
      '
    </>
  );
};

export default AddSlider;
