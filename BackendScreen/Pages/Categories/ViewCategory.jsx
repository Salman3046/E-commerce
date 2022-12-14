import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductCategory,
  loadAllProductCategories,
} from "../../../Services/Actions/productCategoryAction";
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
import Image from "../../../components/Core/Image/Image";
import Box from "../../../components/Core/Box/Box";
import Table from "../../../components/Core/Table/Table";
import Search from "../../../components/Search/Search";
import Action from "../../../components/Outlet/Action";
const ViewCategory = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const [globalCategoryId, setGlobalCategoryId] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const { allProductCategories } = useSelector(
    (state) => state.productCategoryData
  );

  // custom dialog box
  const [setPop, DialogBox] = useDialogBox();
  // custom hook of toaster
  const toaster = useToaster();
  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] =
    usePagination(allProductCategories);

  const dispatch = useDispatch();

  // delete category functionality
  const categoryDeleteHandler = (id) => {
    setPop({ pop: false });
    dispatch(deleteProductCategory(id, userDataFromLocal.token));
    toaster({
      type: "info",
      content: "Product Category Deleted Successfully !",
    });
  };
  useEffect(() => {
    dispatch(loadAllProductCategories(userDataFromLocal.token));
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
            View Categories
          </Typography>
          <CtaButton variant={"primary"} to="/dashboard/category/add-category">
            <AddIcon />
            &nbsp;Add Category
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
          {allProductCategories?.rows?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3">Name</Table.Heading>
                    <Table.Heading className="px-3 py-3">Image</Table.Heading>
                    <Table.Heading className="px-3 py-3" width="400">
                      Description
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Status</Table.Heading>
                    <Table.Heading className="px-3 py-3 text-right" width="100">
                      Manage
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {allProductCategories?.rows &&
                    allProductCategories?.rows
                      ?.filter((cat) =>
                        cat.category_name
                          .toLowerCase()
                          .includes(searchKey.toLowerCase())
                      )
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((curr) => {
                        return (
                          <Table.Row
                            className="text-gray-700 dark:text-gray-700"
                            key={curr?.category_id}
                          >
                            <Table.Data className="px-3 py-3">
                              <Box className="flex items-center leading-tight">
                                <Box>
                                  <Typography
                                    component={"p"}
                                    className="font-semibold"
                                  >
                                    {curr?.category_name}
                                  </Typography>
                                </Box>
                              </Box>
                            </Table.Data>
                            <Table.Data className="px-3 py-3">
                              <Box className="mr-3 hidden md:block flex-shrink-0">
                                <Image
                                  className="h-12 w-auto"
                                  source={`${import.meta.env.VITE_IP_URL}/${
                                    curr?.category_image
                                  }`}
                                  alt={curr?.category_image.slice(20, 60)}
                                />
                              </Box>
                            </Table.Data>
                            <Table.Data className="px-3 py-3">
                              <Box className="description">
                                {curr?.category_description}
                              </Box>
                            </Table.Data>
                            <Table.Data className="px-3 py-3">
                              {curr.category_status !== 1 ? (
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
                                  setGlobalCategoryId(curr.category_id);
                                  setPop({
                                    pop: true,
                                    content: "Delete Product Category",
                                  });
                                }}
                                editPath={`/dashboard/category/edit-category/${curr?.category_id}`}
                              />
                            </Table.Data>
                          </Table.Row>
                        );
                      })}
                </Table.Body>
              </Table>
              <Box className="flex justify-end mt-4">
                {allProductCategories?.rows?.length > 10 && <PaginationComp />}
              </Box>
            </>
          ) : (
            <NotFound
              heading="Category"
              title="No Category Found"
              path="/dashboard/category/add-category"
            />
          )}
        </Box>
        {/* <!-- scrolling table --> */}
      </Box.Section>
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={() => categoryDeleteHandler(globalCategoryId)}>
          Yes
        </Button>
      </DialogBox>
      '
    </>
  );
};

export default ViewCategory;
