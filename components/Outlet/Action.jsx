import React from "react";
import CtaButton from "../Core/Cta/CtaButton";

const Action = ({ action, editPath }) => {
  return (
    <>
      {action && (
        <CtaButton variant={"secondary"} onClick={action}>
          <i className="fa fa-trash"></i>
        </CtaButton>
      )}
      {editPath && (
        <CtaButton to={editPath} variant={"primary"} className="w-5">
          <i className="fa fa-pen"></i>
        </CtaButton>
      )}
    </>
  );
};

export default Action;
