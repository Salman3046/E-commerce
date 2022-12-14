import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/Core/Box/Box";
import CtaButton from "../../components/Core/Cta/CtaButton";
import { Select } from "../../components/Core/Form/FormGroup";
import Typography from "../../components/Core/Typography/Typography";
import { loadStatistics } from "../../Services/Actions/statisticsAction";

const Welcome = () => {
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const { siteSettings } = useSelector((state) => state.siteSettingData);
  const { statistics } = useSelector((state) => state.statisticsData);
  console.log(statistics)
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(loadStatistics(userDataFromLocal?.token));
  }, []);

  return (
    <>
      <Box.Article className="relative bg-gray-500 p-4 sm:p-6 rounded overflow-hidden mb-6">
        <Box className="" aria-hidden="true">
          <Typography
            component={"h2"}
            className="text-2xl md:text-3xl text-white font-bold mb-1"
          >{`Good day, ${siteSettings?.rows?.site_title}. 👋`}</Typography>
          <Typography component={"p"} className="text-white">
            Here is what’s happening with your shop today:
          </Typography>
        </Box>
      </Box.Article>

      <Box className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  mb-5">
        <Box.Article className="bg-white rounded shadow-sm border border-gray-200">
          <Box className="p-5">
            <Typography
              component={"h2"}
              className="text-lg font-semibold text-black"
            >
              Total Orders
            </Typography>
            <Box className="flex items-start mt-4">
              <Typography component={"h4"} className="text-3xl font-bold mr-2">
                {statistics?.orderCount} Orders 
              </Typography>
              {/* <b className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">+49%</b> */}
            </Box>
            <hr className="my-4" />
            <CtaButton to="/dashboard/orders" className="hover:text-blue-600">
              Show all orders
            </CtaButton>
          </Box>
        </Box.Article>

        <Box.Article className="bg-white rounded shadow-sm border border-gray-200">
          <Box className="p-5">
            <Typography
              component={"h2"}
              className="text-lg font-semibold text-black"
            >
              Total Users
            </Typography>
            <Box className="flex items-start mt-4">
              <Typography component={"h4"} className="text-3xl font-bold mr-2">
                {statistics?.userCount} Users
              </Typography>
            </Box>
            <hr className="my-4" />
            <CtaButton to="/dashboard/users" className="hover:text-blue-600">
              Show all users
            </CtaButton>
          </Box>
        </Box.Article>

        <Box.Article className="bg-white rounded shadow-sm border border-gray-200">
          <Box className="p-5">
            <Typography
              component={"h2"}
              className="text-lg font-semibold text-black"
            >
              Total Products
            </Typography>
            <Box className="flex items-start mt-4">
              <Typography component={"h4"} className="text-3xl font-bold mr-2">
              {statistics?.productCount} Products
              </Typography>
            </Box>
            <hr className="my-4" />
            <CtaButton to="/dashboard/products" className="hover:text-blue-600">
              Show all products
            </CtaButton>
          </Box>
        </Box.Article>

        <Box.Article className="bg-white rounded shadow-sm border border-gray-200">
          <Box className="p-5">
            <Typography
              component={"h2"}
              className="text-lg font-semibold text-black"
            >
              Total Category
            </Typography>
            <Box className="flex items-start mt-4">
              <Typography component={"h4"} className="text-3xl font-bold mr-2">
              {statistics?.categoryCount} Category
              </Typography>
            </Box>
            <hr className="my-4" />
            <CtaButton to="/dashboard/category" className="hover:text-blue-600">
              Show all category
            </CtaButton>
          </Box>
        </Box.Article>

        <Box.Article className="bg-white rounded shadow-sm border border-gray-200">
          <Box className="p-5">
            <Typography
              component={"h2"}
              className="text-lg font-semibold text-black"
            >
              Total Subcategory
            </Typography>
            <Box className="flex items-start mt-4">
              <Typography component={"h4"} className="text-3xl font-bold mr-2">
              {statistics?.subCategoryCount} Sub-Category
              </Typography>
            </Box>
            <hr className="my-4" />
            <CtaButton
              to="/dashboard/sub-category"
              className="hover:text-blue-600"
            >
              Show all subcategory
            </CtaButton>
          </Box>
        </Box.Article>

        <Box.Article className="bg-white rounded shadow-sm border border-gray-200">
          <Box className="p-5">
            <Typography
              component={"h2"}
              className="text-lg font-semibold text-black"
            >
              Total Brand
            </Typography>
            <Box className="flex items-start mt-4">
              <Typography component={"h4"} className="text-3xl font-bold mr-2">
              {statistics?.brandCount} Brands
              </Typography>
            </Box>
            <hr className="my-4" />
            <CtaButton to="/dashboard/brands" className="hover:text-blue-600">
              Show all brand
            </CtaButton>
          </Box>
        </Box.Article>
      </Box>
    </>
  );
};

export default Welcome;
