import React from "react";

const Image = ({
  source,
  alt,
  className = "",
  width,
  height,
  srcSet,
  loading,
}) => {
  return (
    <>
      <img
        src={source}
        srcSet={srcSet}
        alt={alt}
        className={className}
        width={width}
        height={height}
        // loading={loading}
      />
    </>
  );
};

export default Image;
