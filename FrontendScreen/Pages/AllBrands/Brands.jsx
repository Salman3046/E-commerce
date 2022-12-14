import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../../components/Core/Box/Box";
import Breadcrumb from "../../../components/Core/Breadcrumb/Breadcrumb";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import Image from "../../../components/Core/Image/Image";
import Typography from "../../../components/Core/Typography/Typography";
import { loadProductBrands } from "../../../Services/Actions/productBrandAction";
import SkeletonBrand from "../../Sections/Skeleton/SkeletonBrand";

const Brands = () => {
  // get brand
  const { productBrands } = useSelector((state) => state.productBrandData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductBrands());
    window.scrollTo(0,0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Breadcrumb value={'Brands'} heading={'All Brands'} />
      <Box className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 mt-3">
        {productBrands?.rows && productBrands?.rows.length !== 0 ? (
          productBrands?.rows &&
          productBrands?.rows
            ?.reverse()
            ?.slice(0, 12)
            .map((brand) => {
              return (
                <CtaButton
                  to={`/brand/${brand.brand_name.replace(/ /g, "-")}/${
                    brand.brand_id
                  }`}
                  key={brand.brand_id}
                >
                  <Box className="p-2">
                    <Box.Article className="mb-5 flex flex-col justify-center">
                      <Image
                        source={`${import.meta.env.VITE_IP_URL}/${
                          brand.brand_image
                        }`}
                        className="mx-auto shadow-sm bg-white rounded-full border "
                        alt={brand.brand_name}
                      />
                      <Typography className="font-semibold text-gray-800 text-center">
                        {brand.brand_name}
                      </Typography>
                    </Box.Article>
                  </Box>
                </CtaButton>
              );
            })
        ) : (
          <>
            <SkeletonBrand type={"rectangular"} />
            <SkeletonBrand type={"rectangular"} />
            <SkeletonBrand type={"rectangular"} />
            <SkeletonBrand type={"rectangular"} />
            <SkeletonBrand type={"rectangular"} />
            <SkeletonBrand type={"rectangular"} />
          </>
        )}
      </Box>
    </>
  );
};

export default Brands;
