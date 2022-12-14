import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotFound from "../../Sections/NotFound";
import usePagination from "../../../hooks/usePagination";
import { loadSiteSettings } from "../../../Services/Actions/siteSettingAction";
import Typography from "../../../components/Core/Typography/Typography";
import Box from "../../../components/Core/Box/Box";
import Table from "../../../components/Core/Table/Table";
import Search from "../../../components/Search/Search";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import useToaster from "../../../hooks/useToaster";
import { loadReturnRequests } from "../../../Services/Actions/returnRequestsAction";


const ViewRequests = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const { returnRequests } = useSelector((state) => state.returnRequestsData);
  console.log(returnRequests)

  const [allRequests, setAllRequests] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  // get site settings
  const { siteSettings } = useSelector((state) => state.siteSettingData);

  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] = usePagination(returnRequests);

  const dispatch = useDispatch();
  // custom hook of toaster
  const toaster = useToaster();

  useLayoutEffect(() => {
    dispatch(loadReturnRequests(userDataFromLocal?.token));
    dispatch(loadSiteSettings());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    setAllRequests(returnRequests?.rows ? returnRequests?.rows : []);
  }, [returnRequests]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Box className="flex justify-between items-center mb-2">
          <Typography
            component={"h1"}
            className="mb-4 text-xl md:text-2xl font-semibold text-black"
          >
            View Return/Replace Orders
          </Typography>
        </Box>

        {/* Search Box */}
        <Search
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        {/* End Search */}

        {/* <!-- scrolling table --> */}
        <Box className="overflow-x-auto shadow-sm">
          {allRequests?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3">
                      Return ID
                    </Table.Heading>

                    <Table.Heading className="px-3 py-3">
                      Customer
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">
                      Product Detail
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Date</Table.Heading>
                    <Table.Heading className="px-3 py-3 text-right" width="100">
                      Manage
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {allRequests &&
                    allRequests
                      ?.filter(
                        (val) =>
                          val.id
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) 
                      )
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map(
                        ({
                            id,
                            first_name,
                            last_name,
                            mobile,
                            email,
                            total_price,
                          products,
                          created_at,
                        }) => {
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
                                      {id}
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
                                    <Typography
                                      component={"p"}
                                      className="font-semibold"
                                    >{`${mobile}`}</Typography>
                                    <Typography
                                      component={"p"}
                                      className="font-semibold"
                                    >{`${email}`}</Typography>
                                  </Box>
                                </Box>
                              </Table.Data>
                              <Table.Data className="px-3 py-3">
                                <Box className="flex items-center leading-tight text-center">
                                  <Box>
                                    <Typography
                                      component={"p"}
                                      className="font-semibold"
                                    >{`${JSON.parse(products).name}`}</Typography>
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
                                      {`${new Date(created_at).toDateString()}`}
                                    </Typography><Typography
                                      component={"p"}
                                      className="font-semibold"
                                    >
                                      {`${new Date(created_at).toLocaleTimeString()}`}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Table.Data>

                              <Table.Data className="px-3 py-3 flex justify-end gap-1">
                                <CtaButton
                                  to={`/dashboard/return-requests/edit-return-request/${id}`}
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
                {allRequests?.length >= 10 && <PaginationComp />}
              </Box>
            </>
          ) : (
            <NotFound heading="Return Request" title="No Requests Found" />
          )}
        </Box>
        {/* <!-- scrolling  table --> */}
      </Box.Section>
    </>
  );
};

export default ViewRequests;
