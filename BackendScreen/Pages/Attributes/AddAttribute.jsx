import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addProductAttribute } from "../../../Services/Actions/productAttributeAction";
import { useDispatch } from "react-redux";
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

const AddAttribute = () => {
  const [inventory, setInventory] = useState({
    attribute_name: "",
    attribute_status: "",
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

  // store Attribute into database
  const submitInventory = (ev) => {
    ev.preventDefault();

    if (!inventory.attribute_name)
      toaster({ type: "error", content: "Please Enter Attribute Name !" });
    else if (!inventory.attribute_status)
      toaster({
        type: "error",
        content: "Please Select Attribute Status !",
      });
    else {
      dispatch(addProductAttribute(inventory, userDataFromLocal.token));
      setInventory({ attribute_name: "", attribute_status: "" });
      toaster({ type: "success", content: "Attribute add successfully" });
      navigate("/dashboard/attributes");
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
          Add Attribute
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel
                    jsxFor="attribute-name"
                    variant={"dark"}
                    required={true}
                  >
                    Attribute Name
                  </InputLabel>
                  <InputField
                    name={"attribute_name"}
                    type={"text"}
                    required={""}
                    variant={"primary"}
                    placeholder={"Attribute Name"}
                    value={inventory.attribute_name}
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
                  value={inventory.attribute_status}
                  onChange={onChangeHandler}
                />
              </Box>
            </Box>
            <Footer
              to={"/dashboard/attributes"}
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

export default AddAttribute;
