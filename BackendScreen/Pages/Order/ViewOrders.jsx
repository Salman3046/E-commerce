import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotFound from "../../Sections/NotFound";
import usePagination from "../../../hooks/usePagination";
import { loadOrders, updateOrder } from "../../../Services/Actions/orderAction";
import { loadSiteSettings } from "../../../Services/Actions/siteSettingAction";
import Typography from "../../../components/Core/Typography/Typography";
import Box from "../../../components/Core/Box/Box";
import Table from "../../../components/Core/Table/Table";
import Search from "../../../components/Search/Search";
import CtaButton from "../../../components/Core/Cta/CtaButton";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Select } from "../../../components/Core/Form/FormGroup";
import { addOrderStatusLogs, loadOrderStatus } from "../../../Services/Actions/orderStatusAction";
import axios from "axios";
import useToaster from "../../../hooks/useToaster";
import {updateReturnRequest} from '../../../Services/Actions/returnRequestsAction'

const ViewOrders = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );

  const [allOrders, setAllOrders] = useState([]);

  const [globalOrderId, setGlobalOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [filterStatusId, setFilterStatusId] = useState("");
  const [statusDialog, setStatusDialog] = useState(false);
  const { orders } = useSelector((state) => state.orderData);
  const { orderStatus } = useSelector((state) => state.orderStatusData);
  const [searchKey, setSearchKey] = useState("");

  // get site settings
  const { siteSettings } = useSelector((state) => state.siteSettingData);

  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] = usePagination(orders);

  const dispatch = useDispatch();
  // custom hook of toaster
  const toaster = useToaster();

  const filterOrderByStatus = () => {
    if (!filterStatusId) {
      setAllOrders(orders?.rows);
    } else {
      console.log(allOrders);
      let tempOrd = orders?.rows;
      setAllOrders(
        tempOrd.filter((ord) => ord.orderStatusNum === filterStatusId)
      );
    }
  };

  const statusChangeHandler = async () => {
    const data =
      status === 5 ? { order_status: status, delivered_at: JSON.stringify(new Date()) } : {order_status: status};
    dispatch(updateOrder(data, globalOrderId, userDataFromLocal?.token));
    setStatusDialog(false);
    toaster({
      type: "success",
      content: "Status Update Successfully",
    });
    dispatch(addOrderStatusLogs({order_id:globalOrderId,status_id:status},userDataFromLocal?.token))
    setGlobalOrderId("");
    setStatus("");
    if(status===8 || status===9)
    {
      dispatch(
        updateReturnRequest({ status: 1 }, globalOrderId, userDataFromLocal?.token)
      );
    }

    await dispatch(loadOrders(userDataFromLocal?.token));
  };

  useLayoutEffect(() => {
    dispatch(loadOrders(userDataFromLocal?.token));
    dispatch(loadOrderStatus(userDataFromLocal?.token));
    dispatch(loadSiteSettings());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    setAllOrders(orders?.rows ? orders?.rows : []);
  }, [orders]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_URL}/api/orders/status/${globalOrderId}`,
        { headers: { Authorization: `Bearer ${userDataFromLocal?.token}` } }
      )
      .then((res) => {
        setStatus(res.data.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [globalOrderId]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Box className="flex justify-between items-center mb-2">
          <Typography
            component={"h1"}
            className="mb-4 text-xl md:text-2xl font-semibold text-black"
          >
            View Orders
          </Typography>
          <Box className="flex items-end">
            <Select
              className="mr-2"
              value={filterStatusId}
              onChange={(e) => setFilterStatusId(+e.target.value)}
            >
              <Select.Item value="">All</Select.Item>
              {orderStatus?.rows &&
                orderStatus?.rows?.map(({ id, name }) => {
                  return (
                    <Select.Item key={id} value={id}>
                      {name}
                    </Select.Item>
                  );
                })}
            </Select>
            <CtaButton variant={"primary"} onClick={filterOrderByStatus}>
              Filter
            </CtaButton>
          </Box>
        </Box>

        {/* Search Box */}
        <Search
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        {/* End Search */}

        {/* <!-- scrolling table --> */}
        <Box className="overflow-x-auto shadow-sm">
          {allOrders?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3">
                      Order No.
                    </Table.Heading>

                    <Table.Heading className="px-3 py-3">
                      Customer
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">
                      Order Total
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Date</Table.Heading>
                    <Table.Heading className="px-3 py-3">Status</Table.Heading>
                    <Table.Heading className="px-3 py-3 text-right" width="100">
                      Manage
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {allOrders &&
                    allOrders
                      ?.filter(
                        (val) =>
                          val.order_id
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) ||
                          val.first_name
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) ||
                          val.last_name
                            .toLowerCase()
                            .includes(searchKey.toLowerCase())
                      )
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map(
                        ({
                          order_id,
                          first_name,
                          last_name,
                          total_price,
                          created_at,
                          order_status,
                        }) => {
                          return (
                            <Table.Row
                              className="text-gray-700 dark:text-gray-700"
                              key={order_id}
                            >
                              <Table.Data className="px-3 py-3">
                                <Box className="flex items-center leading-tight">
                                  <Box>
                                    <Typography
                                      component={"p"}
                                      className="font-semibold"
                                    >
                                      {order_id}
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
                                    >{`${first_name} ${last_name}`}</Typography>
                                  </Box>
                                </Box>
                              </Table.Data>
                              <Table.Data className="px-3 py-3">
                                <Box className="flex items-center leading-tight text-center">
                                  <Box>
                                    <Typography
                                      component={"p"}
                                      className="font-semibold"
                                    >{`${siteSettings?.rows?.currency} ${total_price}`}</Typography>
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
                                      {new Date(created_at).toDateString()}
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
                                      {order_status}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Table.Data>

                              <Table.Data className="px-3 py-3 flex justify-end gap-1">
                                <CtaButton
                                  variant={"secondary"}
                                  onClick={() => {
                                    setGlobalOrderId(order_id);
                                    setStatusDialog(true);
                                  }}
                                >
                                  <i className="fa fa-pen"></i>
                                </CtaButton>
                                <CtaButton
                                  to={`/dashboard/orders/edit-order/${order_id}`}
                                  variant={"primary"}
                                  className="w-5"
                                >
                                  <i className="fa fa-eye"></i>
                                </CtaButton>
                              </Table.Data>
                            </Table.Row>
                          );
                        }
                      )}
                </Table.Body>
              </Table>
              <Box className="flex justify-end mt-4">
                {allOrders?.length >= 10 && <PaginationComp />}
              </Box>
            </>
          ) : (
            <NotFound heading="Orders" title="No Orders Found" />
          )}
        </Box>
        {/* <!-- scrolling  table --> */}
      </Box.Section>
      <Dialog
        open={statusDialog}
        onClose={() => setStatusDialog(false)}
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle>
          <Typography
            component={"h1"}
            className="text-lg text-center mb-2 text-gray-900"
          >
            Status
          </Typography>
        </DialogTitle>

        <DialogContentText component={"span"} variant={"subtitle1"}>
          <Box className="flex justify-center mb-3">
            <Box className="w-3/4">
              <Select
                className={"border-gray-900"}
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <Select.Item>Select...</Select.Item>
                {orderStatus?.rows &&
                  orderStatus?.rows?.map(({ id, name }) => {
                    return (
                      <Select.Item key={id} value={id}>
                        {name}
                      </Select.Item>
                    );
                  })}
              </Select>
            </Box>
          </Box>
        </DialogContentText>

        <DialogActions>
          <Button
            onClick={() => {
              setStatusDialog(false);
              setGlobalOrderId("");
            }}
          >
            Close
          </Button>
          <Button onClick={statusChangeHandler}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewOrders;
