import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { addProductCategory } from "../../../Services/Actions/productCategoryAction";
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
import Box from "../../../components/Core/Box/Box";
import Status from "../../../components/StatusSelection/Status";
import inputRestrictions from "../../../components/InputRestrictions/inputRestrictions";
import Footer from "../../../components/Outlet/Footer";

const AddCategory = () => {
  const [inventory, setInventory] = useState({
    category_name: "",
    category_description: "",
    category_image: "",
    category_status: "",
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
    setInventory({ ...inventory, [name]: value });
  };

  // store category into database
  const submitInventory = (ev) => {
    ev.preventDefault();
    // This code is used for file upload
    const formData = new FormData();
    formData.append("uploadFor", "category");
    formData.append("images", inventory.category_image);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    if (!inventory.category_name)
      toaster({ type: "error", content: "Please Enter Category Name !" });
    else if (!inventory.category_image)
      toaster({ type: "error", content: "Please Select Category image!" });
    else if (!inventory.category_status)
      toaster({
        type: "error",
        content: "Please Select Category Status !",
      });
    else {
      // This code is used for file upload
      axios
        .post(
          `${import.meta.env.VITE_IP_URL}/api/uploadImages/`,
          formData,
          config
        )
        .then((res) => {
          inventory.category_image = res.data?.images[0];
          dispatch(addProductCategory(inventory, userDataFromLocal.token));
          setInventory({
            category_name: "",
            category_description: "",
            category_image: "",
            category_status: "",
          });
          toaster({
            type: "success",
            content: "Category add successfully",
          });
          navigate("/dashboard/category");
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
          Add Category
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Category Name
                  </InputLabel>
                  <InputField
                    name="category_name"
                    type="text"
                    required=""
                    variant="primary"
                    placeholder="Category Name"
                    value={inventory.category_name}
                    onChange={onChangeHandler}
                    onKeyPress={(e) =>
                      inputRestrictions({ evt: e, length: 20 })
                    }
                  />
                </Box>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"}>Description</InputLabel>
                  <Box className="mt-1">
                    <InputField
                      id="about"
                      name="category_description"
                      rows="5"
                      variant="primary"
                      multiline={true}
                      placeholder="Description"
                      value={inventory.category_description}
                      onChange={onChangeHandler}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <InputLabel variant={"dark"} required={true}>
                Category Image
              </InputLabel>
              <Box className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <Box className="space-y-1 text-center flex items-center flex-col">
                  <ImageUploader
                    onFileAdded={(img) => {
                      setInventory({
                        ...inventory,
                        category_image: getImageFile(img),
                      });
                    }}
                    onFileRemoved={() => {
                      setInventory({
                        ...inventory,
                        category_image: deleteImageFile(),
                      });
                    }}
                  />
                  <Box className="flex text-sm text-gray-600">
                    <InputLabel jsxFor="file-upload" variant="dark">
                      <Typography component={"p"} className="pl-1">
                        Upload Image or drag and drop
                      </Typography>
                    </InputLabel>
                  </Box>
                  <Typography component={"p"} className="text-xs text-gray-500">
                    {inventory.category_image?.name
                      ? inventory.category_image?.name
                      : "PNG, JPG and JPEG up to 10MB"}
                  </Typography>
                </Box>
                <Box></Box>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="col-span-6 sm:col-span-3">
                <InputLabel variant="dark" required={true}>
                  Status
                </InputLabel>
                <Status
                  name="category_status"
                  value={inventory.category_status}
                  onChange={onChangeHandler}
                />
              </Box>
            </Box>

            <Footer
              to={"/dashboard/category"}
              onClick={submitInventory}
              text={"Add"}
            />
          </Box>
        </FormGroup>
      </Box.Section>
      '
    </>
  );
};

export default AddCategory;
