import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getSingleProductAttribute,
  updateProductAttribute,
} from "../../../Services/Actions/productAttributeAction";
import { useDispatch, useSelector } from "react-redux";
import useToaster from "../../../hooks/useToaster";
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

const EditAttribute = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState({
    attribute_id: 10,
    attribute_name: "Demo",
    attribute_status: 1,
    created_at: "2022-06-24T14:22:01.000Z",
    updated_at: "2022-06-24T14:22:01.000Z",
  });
  const { productAttribute } = useSelector(
    (state) => state.productAttributeData
  );
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

  // store Attribute into database
  const submitInventory = (ev) => {
    ev.preventDefault();
    if (!inventory.attribute_name)
      toaster({ type: "error", content: "Please Enter Attribute Name !" });
    else if (inventory.attribute_status === "")
      toaster({
        type: "error",
        content: "Please Select Attribute Status !",
      });
    else if (
      JSON.stringify(inventory) === JSON.stringify(productAttribute?.rows)
    )
      toaster({
        type: "error",
        content: "Please Update Something Before Submit !",
      });
    else {
      dispatch(updateProductAttribute(inventory, id, userDataFromLocal?.token));
      toaster({
        type: "success",
        content: "Attribute Update successfully",
      });
      navigate("/dashboard/attributes");
    }
  };

  useEffect(() => {
    dispatch(getSingleProductAttribute(id, userDataFromLocal?.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    productAttribute?.rows
      ? setInventory(productAttribute?.rows)
      : setInventory({
          attribute_id: 10,
          attribute_name: "Demo",
          attribute_status: 1,
          created_at: "2022-06-24T14:22:01.000Z",
          updated_at: "2022-06-24T14:22:01.000Z",
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productAttribute]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Edit Attribute
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel
                    jsxFor={"attribute-name"}
                    variant={"dark"}
                    required={true}
                  >
                    Attribute Name
                  </InputLabel>
                  <InputField
                    name="attribute_name"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder={"Attribute Name"}
                    value={inventory?.attribute_name}
                    onChange={onChangeHandler}
                    onKeyPress={(e) =>
                      inputRestrictions({ evt: e, length: 20 })
                    }
                  />
                </Box>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="col-span-6 sm:col-span-3">
                <InputLabel jsxFor={"status"} variant={"dark"} required={true}>
                  Status
                </InputLabel>
                <Status
                  name="attribute_status"
                  value={inventory?.attribute_status}
                  onChange={onChangeHandler}
                />
              </Box>
            </Box>

            <Footer
              to={"/dashboard/attributes"}
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

export default EditAttribute;
