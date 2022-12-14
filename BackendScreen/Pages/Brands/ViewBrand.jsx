import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductBrand,
  loadAllProductBrands,
} from "../../../Services/Actions/productBrandAction";
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

const ViewBrand = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const [globalBrandId, setGlobalBrandId] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const { allProductBrands } = useSelector((state) => state.productBrandData);

  // custom dialog box
  const [setPop, DialogBox] = useDialogBox();
  // custom hook of toaster
  const toaster = useToaster();
  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] =
    usePagination(allProductBrands);

  const dispatch = useDispatch();

  // delete brand functionality
  const brandDeleteHandler = (id) => {
    setPop({ pop: false });
    dispatch(deleteProductBrand(id, userDataFromLocal.token));
    toaster({
      type: "info",
      content: "Product Brand Deleted Successfully !",
    });
  };
  useEffect(() => {
    dispatch(loadAllProductBrands(userDataFromLocal.token));
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
            View Brands
          </Typography>
          <CtaButton variant={"primary"} to="/dashboard/brands/add-brand">
            <AddIcon />
            &nbsp;Add Brand
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
          {allProductBrands?.rows?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3">Name</Table.Heading>
                    <Table.Heading className="px-3 py-3">Image</Table.Heading>
                    <Table.Heading className="px-3 py-3">Status</Table.Heading>
                    <Table.Heading className="px-3 py-3 text-right" width="100">
                      Manage
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {allProductBrands?.rows &&
                    allProductBrands?.rows
                      ?.filter((val) =>
                        val.brand_name
                          .toLowerCase()
                          .includes(searchKey.toLowerCase())
                      )
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map(
                        ({
                          brand_id,
                          brand_name,
                          brand_image,
                          brand_status,
                        }) => {
                          return (
                            <Table.Row
                              className="text-gray-700 dark:text-gray-700"
                              key={brand_id}
                            >
                              <Table.Data className="px-3 py-3">
                                <Box className="flex items-center leading-tight">
                                  <Box>
                                    <Typography
                                      component={"p"}
                                      className="font-semibold"
                                    >
                                      {brand_name}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Table.Data>
                              <Table.Data className="px-3 py-3">
                                <Box className="mr-3 hidden md:block flex-shrink-0">
                                  <Image
                                    className="h-12 w-auto"
                                    source={`${
                                      import.meta.env.VITE_IP_URL
                                    }/${brand_image}`}
                                    alt={brand_image.slice(20, 60)}
                                  />
                                </Box>
                              </Table.Data>
                              <Table.Data className="px-3 py-3">
                                {brand_status !== 1 ? (
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
                                  editPath={`/dashboard/brands/edit-brand/${brand_id}`}
                                  action={() => {
                                    setGlobalBrandId(brand_id);
                                    setPop({
                                      pop: true,
                                      content: "Delete Product Brand",
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
                {allProductBrands?.rows?.length > 10 && <PaginationComp />}
              </Box>
            </>
          ) : (
            <NotFound
              heading="Brand"
              title="No Brand Found"
              path="/dashboard/brands/add-brand"
            />
          )}
        </Box>
        {/* <!-- scrolling  table --> */}
      </Box.Section>
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={() => brandDeleteHandler(globalBrandId)}>Yes</Button>
      </DialogBox>
      '
    </>
  );
};

export default ViewBrand;
