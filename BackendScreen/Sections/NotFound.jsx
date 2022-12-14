import React from "react";
import Box from "../../components/Core/Box/Box";
import CtaButton from "../../components/Core/Cta/CtaButton";
import Typography from "../../components/Core/Typography/Typography";

const NotFound = ({ heading, title, path }) => {
  return (
    <>
      <Box className="py-12 bg-white">
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Box className="lg:text-center">
            <Typography
              component={"h2"}
              className="text-base text-indigo-600 font-semibold tracking-wide uppercase"
            >
              {heading}
            </Typography>
            <Typography
              component={"p"}
              className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              {title}
            </Typography>
            {path && <CtaButton to={path}>Go and Add</CtaButton>}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
