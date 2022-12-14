import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addProductSubCategory } from "../../../Services/Actions/productSubCategoryAction";
import { useDispatch, useSelector } from "react-redux";
import useToaster from "../../../hooks/useToaster";
import { loadProductCategories } from "../../../Services/Actions/productCategoryAction";
import Select from "react-select";
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

const AddSubCategory = () => {
  const [inventory, setInventory] = useState({
    category_id: "",
    sub_category_name: "",
    sub_category_description: "",
    sub_category_status: "",
  });

  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // custom hook of toaster
  const toaster = useToaster();

  // inputs handler
  const onChangeHandler = (ev) => {
    let { name, value } = ev.target;
    setInventory({ ...inventory, [name]: value });
  };

  // get products category using redux
  const { productCategories } = useSelector(
    (state) => state.productCategoryData
  );
  useEffect(() => {
    dispatch(loadProductCategories(userDataFromLocal.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // store subcategory into database
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
    else if (!inventory.sub_category_status)
      toaster({
        type: "error",
        content: "Please Select Sub Category Status !",
      });
    else {
      dispatch(addProductSubCategory(inventory, userDataFromLocal?.token));
      setInventory({
        category_id: "",
        sub_category_name: "",
        sub_category_description: "",
        sub_category_status: "",
      });
      toaster({
        type: "success",
        content: "Sub Category add successfully",
      });
      navigate("/dashboard/sub-category");
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
          Add Sub Category
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="col-span-6 sm:col-span-3">
                <InputLabel variant={"dark"} required={true}>
                  Category
                </InputLabel>
                <Select
                  options={
                    productCategories?.rows &&
                    productCategories?.rows.map(
                      ({ category_id, category_name }) => {
                        return {
                          value: category_id,
                          label: category_name,
                        };
                      }
                    )
                  }
                  className="mt-3"
                  onChange={(e) =>
                    setInventory({ ...inventory, category_id: e.value })
                  }
                />
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
                    placeholder="Sub Category Name"
                    value={inventory.sub_category_name}
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
                      variant={"primary"}
                      placeholder="Description"
                      value={inventory.sub_category_description}
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
                  value={inventory.sub_category_status}
                  onChange={onChangeHandler}
                />
              </Box>
            </Box>

            <Footer
              to={"/dashboard/sub-category"}
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

export default AddSubCategory;
