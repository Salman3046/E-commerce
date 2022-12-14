import React, { useEffect, useState } from "react";
import {
  getSingleCoupon,
  updateCoupon,
} from "../../../Services/Actions/couponAction";
import { useDispatch, useSelector } from "react-redux";
import useToaster from "../../../hooks/useToaster";
import { useNavigate, useParams, Link } from "react-router-dom";
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

const EditCoupon = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState({
    coupon_name: "",
    coupon_type: "",
    percentage: "",
    amount: "",
    coupon_usage: "",
    minimum_order_amount: "",
    coupon_status: "",
  });
  const { coupon } = useSelector((state) => state.couponData);
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

  // store coupon into database
  const submitInventory = (ev) => {
    ev.preventDefault();

    if (!inventory.coupon_name)
      toaster({ type: "error", content: "Please Enter Coupon Name !" });
    else if (!inventory.coupon_type)
      toaster({ type: "error", content: "Please Select Coupon Type!" });
    else if (!inventory.percentage && !inventory.amount)
      toaster({ type: "error", content: "Please Enter Coupon Amount !" });
    else if (!inventory.coupon_usage)
      toaster({ type: "error", content: "Please Enter Coupon Usage !" });
    else if (!inventory.minimum_order_amount)
      toaster({
        type: "error",
        content: "Please Enter Minimum Order Amount !",
      });
    else if (!inventory.coupon_usage)
      toaster({ type: "error", content: "Please Enter Coupon Usage !" });
    else if (!inventory.coupon_status)
      toaster({ type: "error", content: "Please Select Coupon Status !" });
    else if (JSON.stringify(inventory) === JSON.stringify(coupon?.rows))
      toaster({
        type: "error",
        content: "Please Update Something Before Submit !",
      });
    else {
      +inventory.coupon_type === 2
        ? (inventory.amount = "")
        : (inventory.percentage = "");
      dispatch(updateCoupon(inventory, id, userDataFromLocal.token));
      setInventory({
        coupon_name: "",
        coupon_type: "",
        percentage: "",
        amount: "",
        coupon_usage: "",
        minimum_order_amount: "",
        coupon_status: "",
      });
      toaster({ type: "success", content: "Coupon Update successfully" });
      navigate("/dashboard/coupons");
    }
  };
  useEffect(() => {
    dispatch(getSingleCoupon(id, userDataFromLocal?.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    coupon?.rows
      ? setInventory(coupon?.rows)
      : setInventory({
          coupon_name: "",
          coupon_type: "",
          percentage: "",
          amount: "",
          coupon_usage: "",
          minimum_order_amount: "",
          coupon_status: "",
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupon]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Edit Coupon
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Coupon Name
                  </InputLabel>
                  <InputField
                    name="coupon_name"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Coupon Name"
                    value={inventory.coupon_name}
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
                <InputLabel variant={"dark"} required={true}>
                  Type
                </InputLabel>
                <Select
                  id="country"
                  name="coupon_type"
                  value={inventory.coupon_type}
                  onChange={onChangeHandler}
                >
                  <Select.Item value="">Select</Select.Item>
                  <Select.Item value="2">Discount by percentage</Select.Item>
                  <Select.Item value="1">Discount by amount</Select.Item>
                </Select>
              </Box>
            </Box>
            {inventory.coupon_type !== "" && (
              <Box className="px-4 py-5 bg-white sm:p-3">
                <Box className="grid grid-cols-0 gap-6">
                  <Box className="col-span-12 sm:col-span-3">
                    <InputLabel variant={"dark"} required={true}>
                      {+inventory.coupon_type === 2 ? "Percentage" : "Amount"}
                    </InputLabel>
                    <InputField
                      name={
                        +inventory.coupon_type === 2 ? "percentage" : "amount"
                      }
                      type="text"
                      required=""
                      variant={"primary"}
                      placeholder={
                        +inventory.coupon_type === 2 ? "Percentage" : "Amount"
                      }
                      value={
                        +inventory.coupon_type === 2
                          ? inventory.percentage
                          : inventory.amount
                      }
                      onChange={onChangeHandler}
                      onKeyPress={(e) =>
                        inputRestrictions({ evt: e, length: 7, string: false })
                      }
                    />
                  </Box>
                </Box>
              </Box>
            )}

            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Per User Usage
                  </InputLabel>
                  <InputField
                    name="coupon_usage"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Per User Usage"
                    value={inventory.coupon_usage}
                    onChange={onChangeHandler}
                    onKeyPress={(e) =>
                      inputRestrictions({ evt: e, length: 7, string: false })
                    }
                  />
                </Box>
              </Box>
            </Box>
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Minimum Order Amount
                  </InputLabel>
                  <InputField
                    name="minimum_order_amount"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Minimum Order Amount"
                    value={inventory.minimum_order_amount}
                    onChange={onChangeHandler}
                    onKeyPress={(e) =>
                      inputRestrictions({ evt: e, length: 7, string: false })
                    }
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
                  name="coupon_status"
                  value={inventory.coupon_status}
                  onChange={onChangeHandler}
                />
              </Box>
            </Box>

            <Footer
              to={"/dashboard/coupons"}
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

export default EditCoupon;
