import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../../components/Core/Box/Box";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import Image from "../../../components/Core/Image/Image";
import Typography from "../../../components/Core/Typography/Typography";
import { loadSiteSettings } from "../../../Services/Actions/siteSettingAction";

const NotFound = () => {
  const { siteSettings } = useSelector((state) => state.siteSettingData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSiteSettings());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Box className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-18 overflow-hidden relative">
        <Box className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
          <Box className="w-full md:w-1/2">
            <Box className="mb-10">
              <CtaButton to="/">
                <Image
                  className="h-20 w-auto"
                  source={`${import.meta.env.VITE_IP_URL}/${
                    siteSettings?.rows?.logo
                  }`}
                  alt={siteSettings?.rows?.site_title}
                />
              </CtaButton>
            </Box>
            <Box className="mb-10 md:mb-20 text-gray-600 font-light">
              <Typography
                component={"h1"}
                className="font-black uppercase text-3xl lg:text-5xl text-secondary mb-10"
              >
                You seem to be lost!
              </Typography>
              <Typography component={"p"}>
                The page you're looking for isn't available.
              </Typography>
              <Typography component={"pF"}>
                Try searching again or use the Go Back button below.
              </Typography>
            </Box>
            <Box className="mb-20 md:mb-0">
              <CtaButton
                to="/"
                className="text-lg font-light transform transition-all hover:scale-110"
              >
                Go Home
              </CtaButton>
            </Box>
          </Box>
          <Box className="w-full md:w-1/2 text-center">
            <Image source={"/src/assets/images/404.png"} />
          </Box>
        </Box>
        <Box className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></Box>
        <Box className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></Box>
      </Box>
    </>
  );
};

export default NotFound;
