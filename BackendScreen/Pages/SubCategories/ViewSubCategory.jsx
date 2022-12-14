import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductSubCategory,
  loadAllProductSubCategories,
} from "../../../Services/Actions/productSubCategoryAction";
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

const ViewSubCategory = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const [globalSubCategoryId, setGlobalSubCategoryId] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const { allProductSubCategories } = useSelector(
    (state) => state.productSubCategoryData
  );

  // custom dialog box
  const [setPop, DialogBox] = useDialogBox();
  // custom hook of toaster
  const toaster = useToaster();
  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] = usePagination(
    allProductSubCategories
  );

  const dispatch = useDispatch();

  // delete sub category functionality
  const subCategoryDeleteHandler = (id) => {
    setPop({ pop: false });
    dispatch(deleteProductSubCategory(id, userDataFromLocal.token));
    toaster({
      type: "info",
      content: "Product Sub Category Deleted Successfully !",
    });
  };
  useEffect(() => {
    dispatch(loadAllProductSubCategories(userDataFromLocal.token));
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
            View Subcategories
          </Typography>
          <CtaButton
            to="/dashboard/sub-category/add-sub-category"
            variant={"primary"}
          >
            <AddIcon />
            &nbsp;Add SubCategory
          </CtaButton>
        </Box>

        {/* Search Box */}
        <Search
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        {/* End Search */}
        {/* <!-- scrolling table --> */}
        <Box className="overflow-x-auto shadow-sm">
          {allProductSubCategories?.rows?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3">
                      Category
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3" width="200">
                      Name
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3" width="200">
                      Description
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Status</Table.Heading>
                    <Table.Heading className="px-3 py-3 text-right" width="100">
                      Manage
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {allProductSubCategories?.rows &&
                    allProductSubCategories?.rows
                      ?.filter(({sub_category_name}) =>
                        sub_category_name
                          .toLowerCase()
                          .includes(searchKey.toLowerCase())
                      )
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map(
                        ({
                          sub_category_id,
                          category_name,
                          sub_category_name,
                          sub_category_description,
                          sub_category_status,
                        }) => {
                          return (
                            <Table.Row
                              className="text-gray-700 dark:text-gray-700"
                              key={sub_category_id}
                            >
                              <Table.Data className="px-3 py-3">
                                <Box className="flex items-center leading-tight">
                                  <Box>
                                    <Typography
                                      component={"p"}
                                      className="font-semibold"
                                    >
                                      {category_name}
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
                                      {sub_category_name}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Table.Data>
                              <Table.Data className="px-3 py-3">
                                <Box className="description">
                                  {sub_category_description}
                                </Box>
                              </Table.Data>
                              <Table.Data className="px-3 py-3">
                                {sub_category_status !== 1 ? (
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
                                  editPath={`/dashboard/sub-category/edit-sub-category/${sub_category_id}`}
                                  action={() => {
                                    setGlobalSubCategoryId(sub_category_id);
                                    setPop({
                                      pop: true,
                                      content: "Delete Product Sub Category",
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
                {allProductSubCategories?.rows?.length > 10 && (
                  <PaginationComp />
                )}
              </Box>
            </>
          ) : (
            <NotFound
              heading="Sub Category"
              title="No Sub Categories Found"
              path="/dashboard/sub-category/add-sub-category"
            />
          )}
        </Box>
        {/* <!-- scrolling table --> */}
      </Box.Section>
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={() => subCategoryDeleteHandler(globalSubCategoryId)}>
          Yes
        </Button>
      </DialogBox>
      '
    </>
  );
};

export default ViewSubCategory;
