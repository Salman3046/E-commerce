import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSlider,
  loadAllSliders,
} from "../../../Services/Actions/sliderAction";
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
import Action from "../../../components/Outlet/Action";

const ViewSliders = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const [globalSliderId, setGlobalSliderId] = useState("");
  const { allSliders } = useSelector((state) => state.sliderData);

  // custom dialog box
  const [setPop, DialogBox] = useDialogBox();
  // custom hook of toaster
  const toaster = useToaster();
  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] =
    usePagination(allSliders);

  const dispatch = useDispatch();

  // delete slider functionality
  const sliderDeleteHandler = (id) => {
    setPop({ pop: false });
    dispatch(deleteSlider(id, userDataFromLocal.token));
    toaster({ type: "info", content: "Slider Deleted Successfully !" });
  };
  useEffect(() => {
    dispatch(loadAllSliders(userDataFromLocal.token));
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
            View Sliders
          </Typography>
          <CtaButton variant={"primary"} to="/dashboard/sliders/add-slider">
            <AddIcon />
            &nbsp;Add Slider
          </CtaButton>
        </Box>

        {/* <!-- scrolling table --> */}
        <Box className="overflow-x-auto shadow-sm">
          {allSliders?.rows?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3" width="500">
                      Image
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3" width="200">
                      Link
                    </Table.Heading>
                    <Table.Heading className="px-3 py-3">Status</Table.Heading>
                    <Table.Heading className="px-3 py-3 text-right" width="100">
                      Manage
                    </Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {allSliders?.rows &&
                    allSliders?.rows
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map(
                        ({
                          slider_id,
                          slider_image,
                          slider_link,
                          slider_status,
                        }) => {
                          return (
                            <Table.Row
                              className="text-gray-700 dark:text-gray-700"
                              key={slider_id}
                            >
                              <Table.Data className="px-3 py-3">
                                <Box className="mr-3 hidden md:block flex-shrink-0">
                                  <Image
                                    className="h-28 w-auto"
                                    style={{ height: "216px" }}
                                    source={`${
                                      import.meta.env.VITE_IP_URL
                                    }/${slider_image}`}
                                    alt={slider_image.slice(20, 60)}
                                  />
                                </Box>
                              </Table.Data>
                              <Table.Data className="px-3 py-3">
                                <Box className="flex items-center leading-tight">
                                  <Box>
                                    <Typography
                                      component={"p"}
                                      className="font-semibold"
                                    >
                                      <a href={slider_link}>Link</a>
                                    </Typography>
                                  </Box>
                                </Box>
                              </Table.Data>
                              <Table.Data className="px-3 py-3">
                                {slider_status !== 1 ? (
                                  <Typography className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                                    Inactive
                                  </Typography>
                                ) : (
                                  <Typography className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                    Active
                                  </Typography>
                                )}
                              </Table.Data>
                              <Table.Data className="px-3 py-3">
                                <Action
                                  action={() => {
                                    setGlobalSliderId(slider_id);
                                    setPop({
                                      pop: true,
                                      content: "Delete Slider",
                                    });
                                  }}
                                  editPath={`/dashboard/sliders/edit-slider/${slider_id}`}
                                />
                              </Table.Data>
                            </Table.Row>
                          );
                        }
                      )}
                </Table.Body>
              </Table>
              <Box className="flex justify-end mt-4">
                <PaginationComp />
              </Box>
            </>
          ) : (
            <NotFound
              heading="Sliders"
              title="No Sliders Found"
              path="/dashboard/sliders/add-slider"
            />
          )}
        </Box>
        {/* <!-- scrolling table --> */}
      </Box.Section>
      {/* Custom Dialog Box */}
      <DialogBox>
        <Button onClick={() => setPop({ pop: false })}>No</Button>
        <Button onClick={() => sliderDeleteHandler(globalSliderId)}>Yes</Button>
      </DialogBox>
      '
    </>
  );
};

export default ViewSliders;
