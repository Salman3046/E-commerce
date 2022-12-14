import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoupon,
  loadAllCoupons,
} from "../../../Services/Actions/couponAction";
import useDialogBox from "../../../hooks/useDialogBox";

// MUI Import
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NotFound from "../../Sections/NotFound";
import { Link } from "react-router-dom";
import useToaster from "../../../hooks/useToaster";
import usePagination from "../../../hooks/usePagination";
import { loadSiteSettings } from "../../../Services/Actions/siteSettingAction";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import Typography from "../../../components/Core/Typography/Typography";
import Box from "../../../components/Core/Box/Box";
import Table from "../../../components/Core/Table/Table";
import Search from "../../../components/Search/Search";
import Action from "../../../components/Outlet/Action";

const ViewCoupon = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const [globalCouponId, setCouponId] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const { allCoupons } = useSelector((state) => state.couponData);
  // get site settings
  const { siteSettings } = useSelector((state) => state.siteSettingData);

  // custom dialog box
  const [setPop, DialogBox] = useDialogBox();
  // custom hook of toaster
  const toaster = useToaster();
  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] =
    usePagination(allCoupons);

  const dispatch = useDispatch();

  // delete coupon functionality
  const couponDeleteHandler = (id) => {
    setPop({ pop: false });
    dispatch(deleteCoupon(id, userDataFromLocal.token));
    toaster({ type: "info", content: "Coupon Deleted Successfully !" });
  };
  useEffect(() => {
    dispatch(loadAllCoupons(userDataFromLocal.token));
    dispatch(loadSiteSettings());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Box className="flex justify-between items-center mb-2">
          <Typography
            component={"h1"}
            className="mb-4 text-xl md:text-2xl font-semibold text-black"
          >
            View Coupon
          </Typography>
          <CtaButton variant={"primary"} to="/dashboard/coupons/add-coupon">
            <AddIcon />
            &nbsp;Add Coupon
          </CtaButton>
        </Box>

        {/* Search Box */}
        <Search
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        {/* End Search */}

        {/* <!-- scrolling  table --> */}
        <Box className="overflow-x-auto shadow-sm">
          {allCoupons?.rows?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3">
                      Coupon Name
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Amount</Table.Heading>
                    <Table.Heading className="px-3 py-3">
                      Per user usage
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">
                      Min Order Amount
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Status</Table.Heading>
                    <Table.Heading className="px-3 py-3 text-right" width="100">
                      Manage
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {allCoupons?.rows &&
                    allCoupons?.rows
                      ?.filter((data) =>
                        data.coupon_name
                          .toLowerCase()
                          .includes(searchKey.toLowerCase())
                      )
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((curr) => {
                        return (
                          <Table.Row
                            className="text-gray-700 dark:text-gray-700"
                            key={curr?.coupon_id}
                          >
                            <Table.Data className="px-3 py-3">
                              <Box className="flex items-center leading-tight">
                                <Box>
                                  <Typography
                                    component={"p"}
                                    className="font-semibold"
                                  >
                                    {curr?.coupon_name}
                                  </Typography>
                                </Box>
                              </Box>
                            </Table.Data>
                            <Table.Data className="px-3 py-3">
                              <Box className="flex items-center leading-tight">
                                <Box>
                                  <Typography
                                    component={"p"}
                                    className="font-semibold"
                                  >
                                    {curr?.amount
                                      ? `${curr?.amount} ${siteSettings?.rows?.currency} `
                                      : `${curr?.percentage} %`}
                                  </Typography>
                                </Box>
                              </Box>
                            </Table.Data>
                            <Table.Data className="px-3 py-3">
                              <Box className="flex items-center leading-tight">
                                <Box>
                                  <Typography
                                    component={"p"}
                                    className="font-semibold"
                                  >
                                    {curr.coupon_usage}
                                  </Typography>
                                </Box>
                              </Box>
                            </Table.Data>
                            <Table.Data className="px-3 py-3">
                              <Box className="flex items-center leading-tight">
                                <Box>
                                  <Typography
                                    component={"p"}
                                    className="font-semibold"
                                  >{`${siteSettings?.rows?.currency} ${curr.minimum_order_amount}`}</Typography>
                                </Box>
                              </Box>
                            </Table.Data>

                            <Table.Data className="px-3 py-3">
                              {curr.coupon_status !== 1 ? (
                                <Typography className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                                  Inactive
                                </Typography>
                              ) : (
                                <Typography className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                  Active
                                </Typography>
                              )}
                            </Table.Data>
                            <Table.Data className="px-3 py-3 flex justify-end gap-1">
                              <Action
                                action={() => {
                                  setCouponId(curr.coupon_id);
                                  setPop({
                                    pop: true,
                                    content: "Delete Coupon",
                                  });
                                }}
                                editPath={`/dashboard/coupons/edit-coupon/${curr?.coupon_id}`}
                              />
                            </Table.Data>
                          </Table.Row>
                        );
                      })}
                </Table.Body>
              </Table>
              <Box className="flex justify-end mt-4">
                {allCoupons?.rows?.length > 10 && <PaginationComp />}
              </Box>
            </>
          ) : (
            <NotFound
              heading="Coupon"
              title="No Coupon Found"
              path="/dashboard/coupons/add-coupon"
            />
          )}
        </Box>
        {/* <!-- scrolling table --> */}
      </Box.Section>
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={() => couponDeleteHandler(globalCouponId)}>Yes</Button>
      </DialogBox>
      '
    </>
  );
};

export default ViewCoupon;
