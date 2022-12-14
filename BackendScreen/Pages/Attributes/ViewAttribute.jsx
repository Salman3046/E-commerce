import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAttribute,
  loadAllProductAttributes,
} from "../../../Services/Actions/productAttributeAction";
import useDialogBox from "../../../hooks/useDialogBox";

// MUI Import
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NotFound from "../../Sections/NotFound";
import { Link } from "react-router-dom";
import useToaster from "../../../hooks/useToaster";
import usePagination from "../../../hooks/usePagination";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import Typography from "../../../components/Core/Typography/Typography";
import Box from "../../../components/Core/Box/Box";
import Table from "../../../components/Core/Table/Table";
import Search from "../../../components/Search/Search";
import Action from "../../../components/Outlet/Action";

const ViewAttribute = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const [globalAttributeId, setGlobalAttributeId] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const { allProductAttributes } = useSelector(
    (state) => state.productAttributeData
  );

  // custom dialog box
  const [setPop, DialogBox] = useDialogBox();
  // custom hook of toaster
  const toaster = useToaster();
  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] =
    usePagination(allProductAttributes);

  const dispatch = useDispatch();

  // delete attribute functionality
  const attributeDeleteHandler = (id) => {
    setPop({ pop: false });
    dispatch(deleteProductAttribute(id, userDataFromLocal.token));
    toaster({
      type: "info",
      content: "Product Attribute Deleted Successfully !",
    });
  };
  useEffect(() => {
    dispatch(loadAllProductAttributes(userDataFromLocal.token));
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
            View Attributes
          </Typography>
          <CtaButton
            to="/dashboard/attributes/add-attribute"
            variant={"primary"}
          >
            <AddIcon />
            &nbsp;Add Attribute
          </CtaButton>
        </Box>

        {/* Search Box */}
        <Search
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        {/* End Search */}

        {/* <!-- scrolling horiz. table --> */}
        <Box className="overflow-x-auto shadow-sm">
          {allProductAttributes?.rows?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3" width="600">
                      Name
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Status</Table.Heading>
                    <Table.Heading className="px-3 py-3 text-right" width="100">
                      Manage
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {allProductAttributes?.rows &&
                    allProductAttributes?.rows
                      ?.filter((att) =>
                        att.attribute_name
                          .toLowerCase()
                          .includes(searchKey.toLowerCase())
                      )
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map(
                        ({
                          attribute_id,
                          attribute_name,
                          attribute_status,
                        }) => {
                          return (
                            <Table.Row
                              className="text-gray-700 dark:text-gray-700"
                              key={attribute_id}
                            >
                              <Table.Data className="px-3 py-3">
                                <Box className="flex items-center leading-tight">
                                  <Box>
                                    <Typography
                                      component={"p"}
                                      className="font-semibold"
                                    >
                                      {attribute_name}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Table.Data>
                              <Table.Data className="px-3 py-3">
                                {attribute_status !== 1 ? (
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
                                  editPath={`/dashboard/attributes/edit-attribute/${attribute_id}`}
                                  action={() => {
                                    setGlobalAttributeId(attribute_id);
                                    setPop({
                                      pop: true,
                                      content: "Delete Product Attribute",
                                    });
                                  }}
                                />
                              </Table.Data>
                            </Table.Row>
                          );
                        }
                      )}
                </Table.Body>
              </Table>
              <Box className="flex justify-end mt-4">
                {allProductAttributes?.rows?.length > 10 && <PaginationComp />}
              </Box>
            </>
          ) : (
            <NotFound
              heading="Attribute"
              title="No Attribute Found"
              path="/dashboard/attributes/add-attribute"
            />
          )}
        </Box>
        {/* <!-- scrolling horiz. table --> */}
      </Box.Section>
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={() => attributeDeleteHandler(globalAttributeId)}>
          Yes
        </Button>
      </DialogBox>
      '
    </>
  );
};

export default ViewAttribute;
