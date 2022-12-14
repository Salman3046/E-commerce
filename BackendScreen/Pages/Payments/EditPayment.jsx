import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getSinglePayment,
  updatePayment,
} from "../../../Services/Actions/paymentAction";
import { useDispatch, useSelector } from "react-redux";
import useToaster from "../../../hooks/useToaster";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputField,
  InputLabel,
  Select,
} from "../../../components/Core/Form/FormGroup";
import Typography from "../../../components/Core/Typography/Typography";
import Box from "../../../components/Core/Box/Box";
import Footer from "../../../components/Outlet/Footer";

const EditPayment = () => {
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { payment } = useSelector((state) => state.paymentData);
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
    setPaymentMethod({ ...paymentMethod, [name]: value });
  };

  // store Attribute into database
  const submitPaymentMethod = (ev) => {
    ev.preventDefault();
    if (!paymentMethod.enviroment)
      toaster({ type: "error", content: "Please Enter Attribute Name !" });
    else if (
      paymentMethod.enviroment === "SendBox" &&
      (!paymentMethod.public_key || !paymentMethod.secret_key)
    )
      toaster({
        type: "error",
        content: "Please Fill Sendbox Public & Secret Key !",
      });
    else if (
      paymentMethod.enviroment === "Production" &&
      (!paymentMethod.production_public_key ||
        !paymentMethod.production_secret_key)
    )
      toaster({
        type: "error",
        content: "Please Fill Production Public & Secret Key !",
      });
    else if (JSON.stringify(paymentMethod) === JSON.stringify(payment?.rows))
      toaster({
        type: "error",
        content: "Please Update Something Before Submit !",
      });
    else {
      dispatch(updatePayment(paymentMethod, id, userDataFromLocal?.token));
      toaster({
        type: "success",
        content: "Payment Method Update successfully",
      });
      navigate("/dashboard/payments");
    }
  };

  useEffect(() => {
    dispatch(getSinglePayment(id, userDataFromLocal?.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPaymentMethod(payment?.rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Edit Payment
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="col-span-6 sm:col-span-3">
                <InputLabel className="block text-sm font-medium text-gray-700">
                  Enviroment
                </InputLabel>
                <Select
                  id="country"
                  name="enviroment"
                  value={paymentMethod?.enviroment || ""}
                  onChange={onChangeHandler}
                >
                  <Select.Item value="">Select</Select.Item>
                  <Select.Item value="Sendbox">Sendbox</Select.Item>
                  <Select.Item value="Production">Production</Select.Item>
                </Select>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box className="">
                  <InputLabel variant={"dark"}>Public Key</InputLabel>
                  <InputField
                    name="public_key"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Public Key"
                    value={paymentMethod?.public_key || ""}
                    onChange={onChangeHandler}
                  />
                </Box>
                <Box className="">
                  <InputLabel variant={"dark"}>Secret Key</InputLabel>
                  <InputField
                    name="secret_key"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Secret Key"
                    value={paymentMethod?.secret_key || ""}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                <Box className="">
                  <InputLabel variant={"dark"}>
                    Production Public Key
                  </InputLabel>
                  <InputField
                    name="production_public_key"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Production Public Key"
                    value={paymentMethod?.production_public_key || ""}
                    onChange={onChangeHandler}
                  />
                </Box>
                <Box className="">
                  <InputLabel variant={"dark"}>
                    Production Secret Key
                  </InputLabel>
                  <InputField
                    name="production_secret_key"
                    type="text"
                    required=""
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1"
                    placeholder="Production Secret Key"
                    value={paymentMethod?.production_secret_key || ""}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
            </Box>

            <Footer
              to={"/dashboard/payments"}
              onClick={submitPaymentMethod}
              text={"Update"}
            />
          </Box>
        </FormGroup>
      </Box.Section>
      '
    </>
  );
};

export default EditPayment;
