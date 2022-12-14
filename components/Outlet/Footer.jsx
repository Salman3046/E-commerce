import React from "react";
import Box from "../Core/Box/Box";
import CtaButton from "../Core/Cta/CtaButton";

const Footer = ({ to , onClick, text }) => {
  return (
    <>
      <Box className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        {to && (
          <CtaButton to={to} variant={"primary"} className="mr-5">
            Cancel
          </CtaButton>
        )}
        <CtaButton variant={"primary"} onClick={onClick}>
          {text}
        </CtaButton>
      </Box>
    </>
  );
};

export default Footer;
