import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  loadAllProducts,
} from "../../../Services/Actions/productAction";
import useDialogBox from "../../../hooks/useDialogBox";

// MUI Import
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NotFound from "../../Sections/NotFound";
import { Link } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import Typography from "../../../components/Core/Typography/Typography";
import Box from "../../../components/Core/Box/Box";
import Table from "../../../components/Core/Table/Table";
import Search from "../../../components/Search/Search";
import Action from "../../../components/Outlet/Action";

const ViewProducts = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const [globalProductId, setGlobalProductId] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const { allProducts } = useSelector((state) => state.productData);

  // custom dialog box
  const [setPop, DialogBox] = useDialogBox();
  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] =
    usePagination(allProducts);

  const dispatch = useDispatch();

  // delete product functionality
  const productDeleteHandler = (id) => {
    setPop({ pop: false });
    dispatch(deleteProduct(id, userDataFromLocal?.token));
  };
  useEffect(() => {
    dispatch(loadAllProducts(userDataFromLocal?.token));
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
            View Products
          </Typography>
          <CtaButton to="/dashboard/products/add-product" variant={"primary"}>
            <AddIcon />
            &nbsp;Add Product
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
          {allProducts?.rows?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3">
                      Category
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">
                      Subcategory
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Brand</Table.Heading>
                    <Table.Heading className="px-3 py-3" width="300">
                      Product Name
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Status</Table.Heading>
                    <Table.Heading className="px-3 py-3 text-right" width="100">
                      Manage
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {allProducts?.rows &&
                    allProducts?.rows
                      ?.filter((data) =>
                        data.name
                          .toLowerCase()
                          .includes(searchKey.toLowerCase())
                      )
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((curr) => {
                        return (
                          <Table.Row
                            className="text-gray-700 dark:text-gray-700"
                            key={curr?.id}
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
                              <Box className="flex items-center leading-tight">
                                <Box>
                                  <Typography
                                    component={"p"}
                                    className="font-semibold"
                                  >
                                    {curr?.sub_category_name}
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
                                    {curr?.brand_name}
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
                                    {curr?.name}
                                  </Typography>
                                </Box>
                              </Box>
                            </Table.Data>

                            <Table.Data className="px-3 py-3">
                              {curr.status !== 1 ? (
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
                                editPath={`/dashboard/products/edit-product/${curr?.id}`}
                                action={() => {
                                  setGlobalProductId(curr.id);
                                  setPop({
                                    pop: true,
                                    content: "Delete Product",
                                  });
                                }}
                              />
                            </Table.Data>
                          </Table.Row>
                        );
                      })}
                </Table.Body>
              </Table>
              <Box className="flex justify-end mt-4">
                {allProducts?.rows?.length > 10 && <PaginationComp />}
              </Box>
            </>
          ) : (
            <NotFound
              heading="Products"
              title="No Products Found"
              path="/dashboard/products/add-product"
            />
          )}
        </Box>
        {/* <!-- scrolling table --> */}
      </Box.Section>
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={() => productDeleteHandler(globalProductId)}>
          Yes
        </Button>
      </DialogBox>
    </>
  );
};

export default ViewProducts;
