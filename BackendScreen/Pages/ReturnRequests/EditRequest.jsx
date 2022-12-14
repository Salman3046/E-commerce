import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Box from "../../../components/Core/Box/Box";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import Image from "../../../components/Core/Image/Image";
import List from "../../../components/Core/List/List";
import Table from "../../../components/Core/Table/Table";
import Typography from "../../../components/Core/Typography/Typography";
import { loadSiteSettings } from "../../../Services/Actions/siteSettingAction";
import {
  getSingleReturnRequest,
  updateReturnRequest,
} from "../../../Services/Actions/returnRequestsAction";
import useDialogBox from "../../../hooks/useDialogBox";

// MUI Import
import Button from "@mui/material/Button";
import { addOrderStatusLogs } from "../../../Services/Actions/orderStatusAction";
import { updateOrder } from "../../../Services/Actions/orderAction";
import useToaster from "../../../hooks/useToaster";

const EditRequest = () => {
  const { id } = useParams();
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const { siteSettings } = useSelector((state) => state.siteSettingData);
  const { returnRequest } = useSelector((state) => state.returnRequestsData);

  // custom dialog box
  const [setPop, DialogBox] = useDialogBox();

  const toaster=useToaster();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productItem = useMemo(
    () => returnRequest.products && JSON.parse(returnRequest.products),
    [returnRequest]
  );

  const refundHandler = (type, id) => {
    if (type === 'return') {
      dispatch(
        addOrderStatusLogs(
          { order_id: id, status_id: 8 },
          userDataFromLocal?.token
        )
      );
      dispatch(
        updateOrder({ order_status: 8 }, id, userDataFromLocal?.token)
      );
      dispatch(
        updateReturnRequest({ status: 1 }, id, userDataFromLocal?.token)
      );
      navigate("/dashboard/return-requests");
      setPop({ pop: false });
      toaster({ type: "success", content: "Refund Successfully !" });
    }
    if (type === 'replace') {
      dispatch(
        addOrderStatusLogs(
          { order_id: id, status_id: 9 },
          userDataFromLocal?.token
        )
      );
      dispatch(
        updateOrder({ order_status: 9 }, id, userDataFromLocal?.token)
      );
      dispatch(
        updateReturnRequest({ status: 1 }, id, userDataFromLocal?.token)
      );
      navigate("/dashboard/return-requests");
      setPop({ pop: false });
      toaster({ type: "info", content: "Pickup & Replace Successfully !" });
    }
  };

  useEffect(() => {
    dispatch(loadSiteSettings());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(getSingleReturnRequest(id, userDataFromLocal.token));
    // eslint-disable-next-line
  }, [id]);
  return (
    <>
      <Box className="flex items-center justify-center min-h-screen">
        <Box className="w-full bg-white shadow-lg" id="order-invoice">
          <Box className="flex flex-col items-center justify-center md:flex-row md:justify-between p-4">
            <Box className="flex items-center">
              {/* <h1 className="text-3xl italic font-extrabold tracking-widest text-indigo-500">info</h1> */}
              <CtaButton className="inline-block" to="/dashboard/welcome">
                <Image
                  className="mx-auto h-12 w-auto"
                  source={`${import.meta.env.VITE_IP_URL}/${
                    siteSettings?.rows?.logo
                  }`}
                  alt={siteSettings?.rows?.site_title}
                />
              </CtaButton>
              {/* <Typography component={'p'} className="text-base text-center">
                                {siteSettings?.rows?.site_title}
                            </Typography> */}
            </Box>
            <Box className="p-2">
              <List className="flex flex-col items-center md:flex-row">
                <List.Item className="flex flex-col items-center p-2 md:border-l-2 border-indigo-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <Typography className="text-sm">
                    {siteSettings?.rows?.site_title}.com
                  </Typography>
                </List.Item>
                <List.Item className="flex flex-col items-center p-2 md:border-l-2 border-indigo-200 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600 w-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <Typography className="text-sm">
                    {siteSettings?.rows?.address}
                  </Typography>
                </List.Item>
              </List>
            </Box>
          </Box>
          <Box className="w-full h-0.5 bg-indigo-500"></Box>
          <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 md:m-2">
            <Box className="flex flex-col justify-center items-center">
              <Typography component={"h6"} className="font-bold">
                Order Date :
                <Typography className="text-sm font-medium">
                  {` ${new Date(
                    returnRequest.created_at
                  ).toDateString()} || ${new Date(
                    returnRequest.created_at
                  ).toLocaleTimeString()}`}
                </Typography>
              </Typography>
              <Typography component={"h6"} className="font-bold">
                Order ID :
                <Typography className="text-sm font-medium">
                  {` ${returnRequest.order_id}`}
                </Typography>
              </Typography>
            </Box>
            <Box className="flex flex-col items-center">
              <Typography className="font-bold">
                {returnRequest.type === "return"
                  ? "Return Reason"
                  : "Replace Reason"}
              </Typography>
              <Typography>
                <Typography>Return Reasons</Typography> :{" "}
                {`${returnRequest.reason_name}`}
              </Typography>
            </Box>
            <Box>
              <address className="text-sm text-center">
                <Typography className="font-bold">Billed To :</Typography>
                <Typography>
                  {`${returnRequest.first_name} ${returnRequest.last_name}`}
                </Typography>
                <br />
                <Typography>{returnRequest.address}</Typography>
                <br />
                <Typography>{returnRequest.landmark}</Typography>
                <br />
                <Typography>{returnRequest.pincode}</Typography>
                <br />
                <Typography>{returnRequest.phone_number}</Typography>
              </address>
            </Box>
            <Box></Box>
          </Box>
          <Typography
            component={"h1"}
            className="text-center text-xl font-medium"
          >
            Return/Replace Detail
          </Typography>
          <Box className="overflow-x-auto shadow-sm p-4">
            <Table className="w-full whitespace-no-wrap text-center">
              <Table.Header>
                <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                  <Table.Heading className="px-3 py-3 text-center">
                    Reason
                  </Table.Heading>
                  <Table.Heading className="px-3 py-3 text-center">
                    Sub Reason
                  </Table.Heading>
                  <Table.Heading className="px-3 py-3 text-center">
                    Comment
                  </Table.Heading>
                  <Table.Heading className="px-3 py-3 text-center">
                    Type
                  </Table.Heading>
                  <Table.Heading className="px-3 py-3 text-center">
                    Date
                  </Table.Heading>
                </Table.Row>
              </Table.Header>
              <Table.Body className="bg-white divide-y">
                <Table.Row className="text-gray-700 dark:text-gray-700">
                  <Table.Data className="px-3 py-3">
                    <Box className="flex items-center leading-tight justify-center">
                      <Box>
                        <Typography
                          component={"p"}
                          className="font-semibold text-center"
                        >
                          {returnRequest.reason_name}
                        </Typography>
                      </Box>
                    </Box>
                  </Table.Data>
                  <Table.Data className="px-3 py-3">
                    <Box className="flex items-center leading-tight justify-center">
                      <Box>
                        <Typography component={"p"} className="font-semibold">
                          {returnRequest.sub_reason_name}
                        </Typography>
                      </Box>
                    </Box>
                  </Table.Data>
                  <Table.Data className="px-3 py-3">
                    <Box className="flex items-center leading-tight justify-center">
                      <Box>
                        <Typography component={"p"} className="font-semibold">
                          {returnRequest.comment}
                        </Typography>
                      </Box>
                    </Box>
                  </Table.Data>
                  <Table.Data className="px-3 py-3">
                    <Box className="flex items-center leading-tight justify-center">
                      <Box>
                        <Typography component={"p"} className="font-semibold">
                          {returnRequest.type}
                        </Typography>
                      </Box>
                    </Box>
                  </Table.Data>
                  <Table.Data className="px-3 py-3">
                    <Box className="flex items-center leading-tight">
                      <Box>
                        <Typography component={"p"} className="font-semibold">
                          {`${new Date(
                            returnRequest.created_at
                          ).toDateString()} || ${new Date(
                            returnRequest.created_at
                          ).toLocaleTimeString()}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Table.Data>
                </Table.Row>
              </Table.Body>
            </Table>
          </Box>

          <Typography
            component={"h1"}
            className="text-center text-xl mt-4 font-medium"
          >
            Product Detail
          </Typography>
          <Box className="flex justify-center p-4">
            <Box className="border-b border-gray-200 w-full overflow-x-auto shadow-sm">
              <Table className="w-full">
                <Table.Header className="bg-gray-50">
                  <Table.Row>
                    <Table.Heading className="px-4 py-2 text-xs text-gray-500 ">
                      #
                    </Table.Heading>
                    <Table.Heading className="px-4 py-2 text-xs text-gray-500 ">
                      Product Name
                    </Table.Heading>
                    <Table.Heading className="px-4 py-2 text-xs text-gray-500 ">
                      Quantity
                    </Table.Heading>
                    <Table.Heading className="px-4 py-2 text-xs text-gray-500 ">
                      Coupon Discount
                    </Table.Heading>
                    <Table.Heading className="px-4 py-2 text-xs text-gray-500 ">
                      Subtotal
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white">
                  <Table.Row className="whitespace-nowrap">
                    <Table.Data className="px-6 py-4  text-center">
                      1
                    </Table.Data>
                    <Table.Data className="px-6 py-4">
                      <Box className="text-gray-900">
                        {`${productItem?.name} ${
                          productItem?.attributeName &&
                          `(${productItem?.attributeName})`
                        }`}
                      </Box>
                    </Table.Data>
                    <Table.Data className="px-6 py-4 text-center">
                      {productItem?.finalQuantity}
                    </Table.Data>
                    <Table.Data className="px-6 py-4  text-center">
                      {`${siteSettings?.rows?.currency} ${returnRequest.coupon_discount}`}
                    </Table.Data>
                    <Table.Data className="px-6 py-4 text-center">
                      {`${siteSettings?.rows?.currency} ${
                        productItem?.finalQuantity * +productItem?.finalPrice
                      }`}
                    </Table.Data>
                  </Table.Row>
                  {returnRequest?.tax && (
                    <Table.Row>
                      <Table.Heading colSpan="3"></Table.Heading>
                      <Table.Data className="font-bold">
                        <Typography>Tax</Typography>
                      </Table.Data>
                      <Table.Data className="font-bold">
                        <Typography>{`${siteSettings?.rows?.currency} ${returnRequest?.tax}`}</Typography>
                      </Table.Data>
                    </Table.Row>
                  )}
                  <Table.Row className="text-white bg-gray-800">
                    <Table.Heading colSpan="3"></Table.Heading>
                    <Table.Data className="font-bold">
                      <Typography>Total</Typography>
                    </Table.Data>
                    <Table.Data className="font-bold">
                      <Typography>{`${siteSettings?.rows?.currency} ${returnRequest?.total_price}`}</Typography>
                    </Table.Data>
                  </Table.Row>
                  {/* <!--end tr--> */}
                </Table.Body>
              </Table>
            </Box>
          </Box>

          <Box className="w-full h-0.5 bg-indigo-500"></Box>

          <Box className="p-4">
            <Box className="flex items-end justify-end space-x-3">
              {returnRequest.type === "return" ? (
                <CtaButton
                  className="px-4 py-2 text-sm text-green-600 bg-green-100"
                  onClick={()=>setPop({ pop: true, content: "Refund" })}
                >
                  Refund
                </CtaButton>
              ) : (
                <CtaButton
                  className="px-4 py-2 text-sm text-green-600 bg-green-100"
                  onClick={()=>setPop({ pop: true, content: "Pickup & Replace" })}
                >
                  Pickup & Replace
                </CtaButton>
              )}

              <CtaButton
                className="px-4 py-2 text-sm text-red-600 bg-red-100"
                to="/dashboard/return-requests"
              >
                Back
              </CtaButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Box className="flex items-center justify-center min-h-screen bg-gray-100">
                <Box className="w-6/12 mt-4 text-left bg-white shadow-lg">
                    <Box className="flex justify-between px-8 py-6">
                        <Box className="flex items-center">
                            sale invoice
                        </Box>
                        <Box className="flex items-center gap-4">
                            <button className="px-2 py-1 bg-gray-200 hover:bg-gray-400">Save</button>
                            <button className="px-2 py-1 bg-gray-200 hover:bg-gray-400">Print</button>
                        </Box>
                    </Box>
                    <Box className="w-full h-0.5 bg-gray-800"></Box>
                </Box>
            </Box> */}

      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={() => refundHandler(returnRequest.type, returnRequest.order_id)}>Yes</Button>
      </DialogBox>
    </>
  );
};

export default EditRequest;
