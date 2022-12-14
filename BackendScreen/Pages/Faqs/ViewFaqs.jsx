import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDialogBox from "../../../hooks/useDialogBox";

// MUI Import
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NotFound from "../../Sections/NotFound";
import useToaster from "../../../hooks/useToaster";
import usePagination from "../../../hooks/usePagination";
import { deleteFaq, loadAllFaqs } from "../../../Services/Actions/faqAction";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import Typography from "../../../components/Core/Typography/Typography";
import Box from "../../../components/Core/Box/Box";
import Table from "../../../components/Core/Table/Table";
import Action from "../../../components/Outlet/Action";

const ViewFaqs = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const [globalFaqId, setGlobalFaqId] = useState("");
  const { allFaqs } = useSelector((state) => state.faqData);

  // custom dialog box
  const [setPop, DialogBox] = useDialogBox();
  // custom hook of toaster
  const toaster = useToaster();
  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] = usePagination(allFaqs);

  const dispatch = useDispatch();

  // delete faq functionality
  const faqDeleteHandler = (id) => {
    setPop({ pop: false });
    dispatch(deleteFaq(id, userDataFromLocal.token));
    toaster({ type: "info", content: "Faq Deleted Successfully !" });
  };
  useEffect(() => {
    dispatch(loadAllFaqs(userDataFromLocal.token));
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
            View Faqs
          </Typography>
          <CtaButton variant={"primary"} to="/dashboard/faqs/add-faq">
            <AddIcon />
            &nbsp;Add Faq
          </CtaButton>
        </Box>

        {/* <!-- scrolling table --> */}
        <Box className="overflow-x-auto shadow-sm">
          {allFaqs?.rows?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3">
                      Question
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Answer</Table.Heading>
                    <Table.Heading className="px-3 py-3">Status</Table.Heading>
                    <Table.Heading className="px-3 py-3 text-right" width="100">
                      Manage
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {allFaqs?.rows &&
                    allFaqs?.rows
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map(({ id, question, answer, status }) => {
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
                                    {question}
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
                                    {answer}
                                  </Typography>
                                </Box>
                              </Box>
                            </Table.Data>
                            <Table.Data className="px-3 py-3">
                              {status !== 1 ? (
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
                                editPath={`/dashboard/faqs/edit-faq/${id}`}
                                action={() => {
                                  setGlobalFaqId(id);
                                  setPop({ pop: true, content: "Delete Faq" });
                                }}
                              />
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
              heading="Faqs"
              title="No Faqs Found"
              path="/dashboard/faqs/add-faq"
            />
          )}
        </Box>
        {/* <!-- scrolling table --> */}
      </Box.Section>
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={() => faqDeleteHandler(globalFaqId)}>Yes</Button>
      </DialogBox>
    </>
  );
};

export default ViewFaqs;
