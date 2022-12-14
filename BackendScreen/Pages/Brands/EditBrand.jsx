import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  getSingleProductBrand,
  updateProductBrand,
} from "../../../Services/Actions/productBrandAction";
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
import Box from "../../../components/Core/Box/Box";
import Status from "../../../components/StatusSelection/Status";
import Footer from "../../../components/Outlet/Footer";

const EditBrand = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState({
    brand_id: 10,
    brand_name: "Demo",
    brand_image: "image/brand_image_1656080521090.png",
    brand_status: 1,
    created_at: "2022-06-24T14:22:01.000Z",
    updated_at: "2022-06-24T14:22:01.000Z",
  });
  const { productBrand } = useSelector((state) => state.productBrandData);
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

  // store Brand into database
  const submitInventory = (ev) => {
    ev.preventDefault();
    console.log(inventory);
    if (!inventory.brand_name)
      toaster({ type: "error", content: "Please Enter Brand Name !" });
    else if (!inventory.brand_image)
      toaster({ type: "error", content: "Please Select Brand image!" });
    else if (inventory.brand_status === "")
      toaster({ type: "error", content: "Please Select Brand Status !" });
    else if (JSON.stringify(inventory) === JSON.stringify(productBrand?.rows))
      toaster({
        type: "error",
        content: "Please Update Something Before Submit !",
      });
    else {
      // This code is used for file upload
      const formData = new FormData();
      formData.append("uploadFor", "brand");
      formData.append("images", inventory.brand_image);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      // Check if image is not update
      inventory.brand_image?.name
        ? axios
            .post(
              `${import.meta.env.VITE_IP_URL}/api/uploadImages/`,
              formData,
              config
            )
            .then((res) => {
              inventory.brand_image = res.data?.images[0];
              dispatch(
                updateProductBrand(inventory, id, userDataFromLocal?.token)
              );
              toaster({
                type: "success",
                content: "Brand Update successfully",
              });
              navigate("/dashboard/brands");
            })
            .catch((err) => {
              toaster({
                type: "error",
                content: err.response.data.data.errorResult.message,
              });
            })
        : dispatch(updateProductBrand(inventory, id, userDataFromLocal?.token));
      toaster({ type: "success", content: "Brand Update successfully" });
      navigate("/dashboard/brands");
    }
  };

  useEffect(() => {
    dispatch(getSingleProductBrand(id, userDataFromLocal?.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    productBrand?.rows
      ? setInventory(productBrand?.rows)
      : setInventory({
          brand_id: 10,
          brand_name: "Demo",
          brand_image: "image/brand_image_1656080521090.png",
          brand_status: 1,
          created_at: "2022-06-24T14:22:01.000Z",
          updated_at: "2022-06-24T14:22:01.000Z",
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productBrand]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Edit Brand
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel
                    jsxFor={"brand_name"}
                    variant={"dark"}
                    required={true}
                  >
                    Brand Name
                  </InputLabel>
                  <InputField
                    name={"brand_name"}
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Brand Name"
                    value={inventory?.brand_name}
                    onChange={onChangeHandler}
                    onKeyPress={(e) =>
                      inputRestrictions({ evt: e, length: 20 })
                    }
                  />
                </Box>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <InputLabel variant="dark" required={true}>
                Brand Image
              </InputLabel>
              <Box className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <Box className="space-y-1 text-center flex items-center flex-col">
                  <ImageUploader
                    onFileAdded={(img) => {
                      setInventory({
                        ...inventory,
                        brand_image: getImageFile(img),
                      });
                    }}
                    onFileRemoved={() => {
                      setInventory({
                        ...inventory,
                        brand_image: deleteImageFile(),
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
                  <Typography component={"p"} className="text-xs text-gray-500">
                    {inventory?.brand_image?.name
                      ? inventory?.brand_image?.name
                      : inventory?.brand_image?.slice(28, 60)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="col-span-6 sm:col-span-3">
                <InputLabel
                  jsxFor="brand_status"
                  variant={"dark"}
                  required={true}
                >
                  Status
                </InputLabel>
                <Status
                  name="brand_status"
                  value={inventory.brand_status}
                  onChange={onChangeHandler}
                />
              </Box>
            </Box>

            <Footer
              to={"/dashboard/brands"}
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

export default EditBrand;
