import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  getSingleProductCategory,
  updateProductCategory,
} from "../../../Services/Actions/productCategoryAction";
import { useDispatch, useSelector } from "react-redux";
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
import inputRestrictions from "../../../components/InputRestrictions/inputRestrictions";
import Footer from "../../../components/Outlet/Footer";

const EditCategory = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState({
    category_id: 10,
    category_name: "Demo",
    category_description: "Demo",
    category_image: "image/category_image_1656080521090.png",
    category_status: 1,
    created_at: "2022-06-24T14:22:01.000Z",
    updated_at: "2022-06-24T14:22:01.000Z",
  });
  const { productCategory } = useSelector((state) => state.productCategoryData);
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
    if (!inventory.category_name)
      toaster({ type: "error", content: "Please Enter Category Name !" });
    else if (!inventory.category_description)
      toaster({
        type: "error",
        content: "Please Enter Category Description !",
      });
    else if (!inventory.category_image)
      toaster({ type: "error", content: "Please Select Category image!" });
    else if (inventory.category_status === "")
      toaster({
        type: "error",
        content: "Please Select Category Status !",
      });
    else if (
      JSON.stringify(inventory) === JSON.stringify(productCategory?.rows)
    )
      toaster({
        type: "error",
        content: "Please Update Something Before Submit !",
      });
    else {
      // This code is used for file upload
      const formData = new FormData();
      formData.append("uploadFor", "category");
      formData.append("images", inventory.category_image);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      // Check if image is not update
      inventory.category_image?.name
        ? axios
            .post(
              `${import.meta.env.VITE_IP_URL}/api/uploadImages/`,
              formData,
              config
            )
            .then((res) => {
              inventory.category_image = res.data?.images[0];
              dispatch(
                updateProductCategory(inventory, id, userDataFromLocal?.token)
              );
              toaster({
                type: "success",
                content: "Category Update successfully",
              });
              navigate("/dashboard/category");
            })
            .catch((err) => {
              toaster({
                type: "error",
                content: err.response.data.data.errorResult.message,
              });
            })
        : dispatch(
            updateProductCategory(inventory, id, userDataFromLocal?.token)
          );
      toaster({
        type: "success",
        content: "Category Update successfully",
      });
      navigate("/dashboard/category");
    }
  };

  useEffect(() => {
    dispatch(getSingleProductCategory(id, userDataFromLocal?.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    productCategory?.rows
      ? setInventory(productCategory?.rows)
      : setInventory({
          category_id: 10,
          category_name: "Demo",
          category_description: "Demo",
          category_image: "image/category_image_1656080521090.png",
          category_status: 1,
          created_at: "2022-06-24T14:22:01.000Z",
          updated_at: "2022-06-24T14:22:01.000Z",
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCategory]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Edit Category
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
                    value={inventory?.category_name}
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
                  <InputLabel variant={"dark"} required={true}>
                    Description
                  </InputLabel>
                  <Box className="mt-1">
                    <InputField
                      id="about"
                      name="category_description"
                      rows="5"
                      variant="primary"
                      multiline={true}
                      placeholder="Description"
                      value={inventory?.category_description}
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
                    {inventory?.category_image?.name
                      ? inventory?.category_image?.name
                      : inventory?.category_image?.slice(28, 60)}
                  </Typography>
                </Box>
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
              text={"Update"}
            />
          </Box>
        </FormGroup>
      </Box.Section>
      '
    </>
  );
};

export default EditCategory;
