import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../../components/Core/Box/Box";
import Breadcrumb from "../../../components/Core/Breadcrumb/Breadcrumb";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import Typography from "../../../components/Core/Typography/Typography";
import { loadProductCategories } from "../../../Services/Actions/productCategoryAction";
import { loadProductSubCategories } from "../../../Services/Actions/productSubCategoryAction";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Categories = () => {
  // get categories
  const { productCategories } = useSelector(
    (state) => state.productCategoryData
  );
  // get subCategories
  const { productSubCategories } = useSelector(
    (state) => state.productSubCategoryData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductCategories());
    dispatch(loadProductSubCategories());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Breadcrumb value={"Categories"} heading={"All Categories"} />
      {productCategories?.rows &&
        productCategories?.rows?.reverse().map((cat) => {
          return (
            <Box key={cat.category_id} className={"mt-8 mb-4"}>
              <CtaButton
                to={`/product-category/${cat.category_name.replace(
                  / /g,
                  "-"
                )}/${cat.category_id}`}
                className={"hover:text-blue-600"}
              >
                <Typography
                  component={"h2"}
                  className="text-2xl font-semibold root-font md:text-3xl text-center"
                >
                  {cat.category_name}
                </Typography>
              </CtaButton>
              <Box className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 mt-2 mb-3 p-3">
                {productSubCategories?.rows &&
                  productSubCategories?.rows
                    ?.reverse()
                    .filter((subCat) => subCat.category_id === cat.category_id)
                    .map((subCat) => {
                      return (
                        <CtaButton
                          to={`/product-subcategory/${subCat.sub_category_name.replace(
                            / /g,
                            "-"
                          )}/${subCat.sub_category_id}`}
                          className="group text-center flex justify-start items-start md:justify-center md:items-center mt-3 mb-3"
                          key={subCat.sub_category_id}
                        >
                          <ArrowRightIcon className="group-hover:text-blue-600" />
                          <Typography
                            component={"p"}
                            className="text-center text-gray-900 font-medium group-hover:text-blue-600"
                          >
                            {subCat.sub_category_name}
                          </Typography>
                        </CtaButton>
                      );
                    })}
              </Box>
            </Box>
          );
        })}
    </>
  );
};

export default Categories;
