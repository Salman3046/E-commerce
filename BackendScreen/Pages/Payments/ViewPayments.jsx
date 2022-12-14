import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePayment,
  loadAllPayments,
} from "../../../Services/Actions/paymentAction";
import useDialogBox from "../../../hooks/useDialogBox";

// MUI Import
import Button from "@mui/material/Button";
import NotFound from "../../Sections/NotFound";
import useToaster from "../../../hooks/useToaster";
import Switch from "react-switch";
import usePagination from "../../../hooks/usePagination";
import { Link } from "react-router-dom";
import Typography from "../../../components/Core/Typography/Typography";
import Box from "../../../components/Core/Box/Box";
import Table from "../../../components/Core/Table/Table";
import Action from "../../../components/Outlet/Action";

const ViewPayments = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const [globalPaymentId, setGlobalPaymentId] = useState({
    id: "",
    status: "",
  });
  const { allPayments } = useSelector((state) => state.paymentData);

  // custom dialog box
  const [setPop, DialogBox] = useDialogBox();
  // custom hook of toaster
  const toaster = useToaster();
  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] =
    usePagination(allPayments);

  const dispatch = useDispatch();

  // payment status functionality
  const paymentStatusHandler = (data) => {
    setPop({ pop: false });
    dispatch(
      updatePayment({ status: data.status }, data.id, userDataFromLocal?.token)
    );
    toaster({ type: "info", content: "Status Changed Successfully !" });
  };
  useEffect(() => {
    dispatch(loadAllPayments(userDataFromLocal.token));
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
            View Payments
          </Typography>
        </Box>

        {/* <!-- scrolling  table --> */}
        <Box className="overflow-x-auto shadow-sm">
          {allPayments?.rows?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3" width="800">
                      Name
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Status</Table.Heading>
                    <Table.Heading className="px-3 py-3 text-right" width="100">
                      Manage
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {allPayments?.rows &&
                    allPayments?.rows
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map(({ id, name, status }) => {
                        return (
                          <Table.Row
                            className="text-gray-700 dark:text-gray-700"
                            key={id}
                          >
                            <Table.Data className="px-3 py-3">
                              <Box className="flex items-center leading-tight">
                                <Box>
                                  <Typography
                                    component={"p"}
                                    className="font-semibold"
                                  >
                                    {name}
                                  </Typography>
                                </Box>
                              </Box>
                            </Table.Data>
                            <Table.Data className="px-3 py-3">
                              <Switch
                                onChange={() => {
                                  setGlobalPaymentId({
                                    id: id,
                                    status: status === 0 ? 1 : 0,
                                  });
                                  setPop({
                                    pop: true,
                                    content: "Change Status",
                                  });
                                }}
                                checked={status === 0 ? false : true}
                                className="react-switch"
                              />
                            </Table.Data>
                            <Table.Data className="px-3 py-3 flex justify-end gap-1">
                              {name !== "COD" ? (
                                <Action
                                  editPath={`/dashboard/payments/edit-payment/${id}`}
                                />
                              ) : null}
                            </Table.Data>
                          </Table.Row>
                        );
                      })}
                </Table.Body>
              </Table>
              <Box className="flex justify-end mt-4">
                <PaginationComp />
              </Box>
            </>
          ) : (
            <NotFound
              heading="Payments"
              title="No Payments Found"
              path="/dashboard/payments"
            />
          )}
        </Box>
        {/* <!-- scrolling  table --> */}
      </Box.Section>
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={() => paymentStatusHandler(globalPaymentId)}>
          Yes
        </Button>
      </DialogBox>
      '
    </>
  );
};

export default ViewPayments;
