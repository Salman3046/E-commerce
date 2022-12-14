import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "../../../components/Core/Box/Box";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import Image from "../../../components/Core/Image/Image";
import List from "../../../components/Core/List/List";
import Table from "../../../components/Core/Table/Table";
import Typography from "../../../components/Core/Typography/Typography";
import { getSingleOrder } from "../../../Services/Actions/orderAction";
import { loadSiteSettings } from "../../../Services/Actions/siteSettingAction";
import usePdfDownloader from "../../../hooks/usePdfDownloader";

const EditOrder = () => {
  const { id } = useParams();
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const { siteSettings } = useSelector((state) => state.siteSettingData);
  const { order } = useSelector((state) => state.orderData);
  const dispatch = useDispatch();

  const productItem = useMemo(
    () => order.products && JSON.parse(order.products),
    [order]
  );

  const pdfDownload = usePdfDownloader();

  useEffect(() => {
    dispatch(loadSiteSettings());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(getSingleOrder(id, userDataFromLocal.token));
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
                    order.created_at
                  ).toDateString()} || ${new Date(
                    order.created_at
                  ).toLocaleTimeString()}`}
                </Typography>
              </Typography>
              <Typography component={"h6"} className="font-bold">
                Order ID :
                <Typography className="text-sm font-medium">
                  {` ${order.order_id}`}
                </Typography>
              </Typography>
            </Box>
            <Box>
              <address className="text-sm text-center">
                <Typography className="font-bold">Billed To :</Typography>
                <Typography>
                  {`${order.first_name} ${order.last_name}`}
                </Typography>
                <br />
                <Typography>{order.address}</Typography>
                <br />
                <Typography>{order.landmark}</Typography>
                <br />
                <Typography>{order.pincode}</Typography>
                <br />
                <Typography>{order.phone_number}</Typography>
              </address>
            </Box>
            <Box>
              <address className="text-sm text-center">
                <Typography className="font-bold">Billed To :</Typography>
                <Typography>
                  {`${order.first_name} ${order.last_name}`}
                </Typography>
                <br />
                <Typography>{order.address}</Typography>
                <br />
                <Typography>{order.landmark}</Typography>
                <br />
                <Typography>{order.pincode}</Typography>
                <br />
                <Typography>{order.phone_number}</Typography>
              </address>
            </Box>
            <Box></Box>
          </Box>
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
                      {`${siteSettings?.rows?.currency} ${order.coupon_discount}`}
                    </Table.Data>
                    <Table.Data className="px-6 py-4 text-center">
                      {`${siteSettings?.rows?.currency} ${
                        productItem?.finalQuantity * +productItem?.finalPrice
                      }`}
                    </Table.Data>
                  </Table.Row>
                  {order?.tax && (
                    <Table.Row>
                      <Table.Heading colSpan="3"></Table.Heading>
                      <Table.Data className="font-bold">
                        <Typography>Tax</Typography>
                      </Table.Data>
                      <Table.Data className="font-bold">
                        <Typography>{`${siteSettings?.rows?.currency} ${order?.tax}`}</Typography>
                      </Table.Data>
                    </Table.Row>
                  )}
                  <Table.Row className="text-white bg-gray-800">
                    <Table.Heading colSpan="3"></Table.Heading>
                    <Table.Data className="font-bold">
                      <Typography>Total</Typography>
                    </Table.Data>
                    <Table.Data className="font-bold">
                      <Typography>{`${siteSettings?.rows?.currency} ${order?.total_price}`}</Typography>
                    </Table.Data>
                  </Table.Row>
                  {/* <!--end tr--> */}
                </Table.Body>
              </Table>
            </Box>
          </Box>

          {/* <Box className="flex justify-between p-4">
                        <Box>
                            <Typography
                                component={'h3'}
                                className="text-xl">
                                Terms And Condition :
                            </Typography>
                            <List className="text-xs list-disc list-inside">
                                <List.Item>All accounts are to be paid within 7 days from receipt of invoice.</List.Item>
                                <List.Item>To be paid by cheque or credit card or direct payment online.</List.Item>
                                <List.Item>If account is not paid within 7 days the credits details supplied.</List.Item>
                            </List>
                        </Box>
                        <Box className="p-4">
                            <Typography>Signature</Typography>
                            <Box className="text-4xl italic text-indigo-500">AAA</Box>
                        </Box>
                    </Box> */}

          <Box className="w-full h-0.5 bg-indigo-500"></Box>

          <Box className="p-4">
            <Box className="flex items-center justify-center text-center">
              Thank you very much for connecting with us.
            </Box>
            <Box className="flex items-end justify-end space-x-3">
              {/* <CtaButton
                className="px-4 py-2 text-sm text-green-600 bg-green-100"
                onClick={() => pdfDownload("order-invoice", order.order_id)}
              >
                Print
              </CtaButton> */}
              <CtaButton
                className="px-4 py-2 text-sm text-red-600 bg-red-100"
                to="/dashboard/orders"
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
    </>
  );
};

export default EditOrder;
