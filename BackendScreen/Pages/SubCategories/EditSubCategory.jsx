import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getSingleProductSubCategory,
  updateProductSubCategory,
} from "../../../Services/Actions/productSubCategoryAction";
import { useDispatch, useSelector } from "react-redux";
import useToaster from "../../../hooks/useToaster";
import { loadProductCategories } from "../../../Services/Actions/productCategoryAction";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputField,
  InputLabel,
  Select,
} from "../../../components/Core/Form/FormGroup";
import Typography from "../../../components/Core/Typography/Typography";
import Status from "../../../components/StatusSelection/Status";
import Box from "../../../components/Core/Box/Box";
import inputRestrictions from "../../../components/InputRestrictions/inputRestrictions";
import Footer from "../../../components/Outlet/Footer";

const EditSubCategory = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState({
    sub_category_id: 10,
    category_id: "",
    sub_category_name: "Demo",
    sub_category_description: "Demo",
    sub_category_status: 1,
    created_at: "2022-06-24T14:22:01.000Z",
    updated_at: "2022-06-24T14:22:01.000Z",
  });
  const { productSubCategory } = useSelector(
    (state) => state.productSubCategoryData
  );
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // custom hook of toaster
  const toaster = useToaster();

  // get products category using redux
  const { productCategories } = useSelector(
    (state) => state.productCategoryData
  );
  useEffect(() => {
    dispatch(loadProductCategories(userDataFromLocal.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // inputs handler
  const onChangeHandler = (ev) => {
    let { name, value } = ev.target;
    setInventory({ ...inventory, [name]: value });
  };

  // store category into database
  const submitInventory = (ev) => {
    ev.preventDefault();
    if (!inventory.category_id)
      toaster({ type: "error", content: "Please Select Category !" });
    else if (!inventory.sub_category_name)
      toaster({
        type: "error",
        content: "Please Enter Sub Category Name !",
      });
    else if (!inventory.sub_category_description)
      toaster({
        type: "error",
        content: "Please Enter Sub Category Description !",
      });
    else if (inventory.sub_category_status === "")
      toaster({
        type: "error",
        content: "Please Select Sub Category Status !",
      });
    else if (
      JSON.stringify(inventory) === JSON.stringify(productSubCategory?.rows)
    )
      toaster({
        type: "error",
        content: "Please Update Something Before Submit !",
      });
    else {
      dispatch(
        updateProductSubCategory(inventory, id, userDataFromLocal?.token)
      );
      toaster({
        type: "success",
        content: "Sub Category Update successfully",
      });
      navigate("/dashboard/sub-category");
    }
  };

  useEffect(() => {
    dispatch(getSingleProductSubCategory(id, userDataFromLocal?.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    productSubCategory?.rows
      ? setInventory(productSubCategory?.rows)
      : setInventory({
          sub_category_id: 10,
          category_id: 10,
          sub_category_name: "Demo",
          sub_category_description: "Demo",
          sub_category_status: 1,
          created_at: "2022-06-24T14:22:01.000Z",
          updated_at: "2022-06-24T14:22:01.000Z",
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSubCategory]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Edit Sub Category
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="col-span-6 sm:col-span-3">
                <InputLabel variant={"dark"} required={true}>
                  Category
                </InputLabel>
                <Select
                  name="category_id"
                  value={inventory.category_id}
                  onChange={onChangeHandler}
                >
                  <Select.Item>Select...</Select.Item>
                  {productCategories?.rows &&
                    productCategories?.rows.map(
                      ({ category_id, category_name }) => {
                        return (
                          <Select.Item value={category_id} key={category_id}>
                            {category_name}
                          </Select.Item>
                        );
                      }
                    )}
                </Select>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Sub Category Name
                  </InputLabel>
                  <InputField
                    name="sub_category_name"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Category Name"
                    value={inventory?.sub_category_name}
                    onChange={onChangeHandler}
                    onKeyPress={(e) =>
                      inputRestrictions({ evt: e, length: 25 })
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
                      name="sub_category_description"
                      rows="5"
                      multiline={true}
                      variant={"primary"}
                      placeholder="Description"
                      value={inventory?.sub_category_description}
                      onChange={onChangeHandler}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="col-span-6 sm:col-span-3">
                <InputLabel variant={"dark"} required={true}>
                  Status
                </InputLabel>
                <Status
                  name="sub_category_status"
                  value={inventory?.sub_category_status}
                  onChange={onChangeHandler}
                />
              </Box>
            </Box>

            <Footer
              to={"/dashboard/sub-category"}
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

export default EditSubCategory;
