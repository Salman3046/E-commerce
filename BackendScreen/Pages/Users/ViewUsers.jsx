import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, loadUsers } from "../../../Services/Actions/userAction";
import useDialogBox from "../../../hooks/useDialogBox";

// MUI Import
import Button from "@mui/material/Button";
import NotFound from "../../Sections/NotFound";
import useToaster from "../../../hooks/useToaster";
import Switch from "react-switch";
import usePagination from "../../../hooks/usePagination";
import Typography from "../../../components/Core/Typography/Typography";
import Image from "../../../components/Core/Image/Image";
import Box from "../../../components/Core/Box/Box";
import Table from "../../../components/Core/Table/Table";
import Search from "../../../components/Search/Search";

const ViewUsers = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const [globalUserId, setGlobalUserId] = useState({ id: "", status: "" });
  const [searchKey, setSearchKey] = useState("");
  const { users } = useSelector((state) => state.userData);

  // custom dialog box
  const [setPop, DialogBox] = useDialogBox();
  // custom hook of toaster
  const toaster = useToaster();
  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] = usePagination(users);

  const dispatch = useDispatch();

  // user status functionality
  const userStatusHandler = (data) => {
    setPop({ pop: false });
    dispatch(
      updateUser({ status: data.status }, data.id, userDataFromLocal?.token)
    );
    toaster({ type: "info", content: "Status Changed Successfully !" });
  };
  useEffect(() => {
    dispatch(loadUsers(userDataFromLocal.token));
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
            View Users
          </Typography>
        </Box>

        {/* Search Box */}
        <Search
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        {/* End Search */}

        {/* <!-- scrolling horiz. table --> */}
        <Box className="overflow-x-auto shadow-sm">
          {users?.rows?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3">Image</Table.Heading>
                    <Table.Heading className="px-3 py-3">Name</Table.Heading>
                    <Table.Heading className="px-3 py-3">Mobile</Table.Heading>
                    <Table.Heading className="px-3 py-3">Email</Table.Heading>
                    <Table.Heading className="px-3 py-3">Role</Table.Heading>
                    <Table.Heading className="px-3 py-3">Status</Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {users?.rows &&
                    users?.rows
                      ?.filter(
                        (val) =>
                          val.first_name
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) ||
                          val.last_name
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) ||
                          val.email
                            .toLowerCase()
                            .includes(searchKey.toLowerCase())
                      )
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map(
                        ({
                          id,
                          profile_image,
                          first_name,
                          last_name,
                          phone_number,
                          email,
                          roles,
                          status,
                        }) => {
                          return (
                            <Table.Row
                              className="text-gray-700 dark:text-gray-700"
                              key={id}
                            >
                              <Table.Data className="px-3 py-3">
                                <Box className="mr-3 hidden md:block flex-shrink-0">
                                  <Image
                                    className="h-12 w-auto"
                                    source={
                                      profile_image
                                        ? `${
                                            import.meta.env.VITE_IP_URL
                                          }/${profile_image}`
                                        : "/src/assets/images/default_user.png"
                                    }
                                    alt={
                                      profile_image &&
                                      profile_image.slice(20, 60)
                                    }
                                  />
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
                                <Box className="flex items-center leading-tight">
                                  <Box>
                                    <Typography
                                      component={"p"}
                                      className="font-semibold"
                                    >
                                      {phone_number}
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
                                      {email}
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
                                      {roles}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Table.Data>

                              <Table.Data className="px-3 py-3">
                                <Switch
                                  onChange={() => {
                                    setGlobalUserId({
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
                            </Table.Row>
                          );
                        }
                      )}
                </Table.Body>
              </Table>
              <Box className="flex justify-end mt-4">
                {users?.rows?.length > 10 && <PaginationComp />}
              </Box>
            </>
          ) : (
            <NotFound
              heading="Users"
              title="No User Found"
              path="/dashboard/users"
            />
          )}
        </Box>
        {/* <!-- scrolling horiz. table --> */}
      </Box.Section>
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={() => userStatusHandler(globalUserId)}>Yes</Button>
      </DialogBox>
      '
    </>
  );
};

export default ViewUsers;
