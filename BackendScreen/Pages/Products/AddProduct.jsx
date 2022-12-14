import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProductCategories } from "../../../Services/Actions/productCategoryAction";
import { loadProductSubCategories } from "../../../Services/Actions/productSubCategoryAction";
import { loadProductBrands } from "../../../Services/Actions/productBrandAction";
import { loadProductAttributes } from "../../../Services/Actions/productAttributeAction";
import ReactSelect from "react-select";
import { WithContext as ReactTags } from "react-tag-input";
import Switch from "react-switch";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import useToaster from "../../../hooks/useToaster";
import { useMemo } from "react";
import { addProduct } from "../../../Services/Actions/productAction";
import axios from "axios";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputField,
  InputLabel,
  Select,
} from "../../../components/Core/Form/FormGroup";
import Typography from "../../../components/Core/Typography/Typography";
import Image from "../../../components/Core/Image/Image";
import Box from "../../../components/Core/Box/Box";
import inputRestrictions from "../../../components/InputRestrictions/inputRestrictions";
import Footer from "../../../components/Outlet/Footer";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import TextEditor from "../../../components/TextEditor/TextEditor";

import {
  EditorState,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

const AddProduct = () => {
  // get user token for api authentication
  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  // all products state
  const [inventory, setInventory] = useState({
    name: "",
    category_id: "",
    sub_category_id: "",
    brand_id: "",
    sku: "",
    images: [],
    tags: "",
    price: "",
    discount_price: "",
    quantity: "",
    is_variation: 0,
    variation_description: "",
    description: "",
    is_free_shipping: 0,
    is_flat_rate: 0,
    shipping_cost: "",
    is_return: 0,
    return_days: "",
    is_featured: 0,
    estimated_shipping_days: "",
    tax: "",
    status: 1,
  });

  const [description, setDescription] = useState({ content: EditorState.createEmpty() });

  // these state is used for dynamic field population
  const [variationData, setVariationData] = useState({
    attribute: "",
    attribute_desc: [],
  });
  const [dynamicVariationField, setDynamicVariationField] = useState({
    variation: "",
    price: "",
    discount_price: "",
    quantity: "",
  });

  // all product images
  const [productImages, setProductImages] = useState([]);

  // this state is used for tax
  const [taxation, setTaxation] = useState({ amount: "", type: "" });

  // get products category using redux
  const { productCategories } = useSelector(
    (state) => state.productCategoryData
  );
  useEffect(() => {
    dispatch(loadProductCategories(userDataFromLocal.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // get products subcategory using redux
  const { productSubCategories } = useSelector(
    (state) => state.productSubCategoryData
  );
  useEffect(() => {
    dispatch(loadProductSubCategories(userDataFromLocal.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // get products brand using redux
  const { productBrands } = useSelector((state) => state.productBrandData);
  useEffect(() => {
    dispatch(loadProductBrands(userDataFromLocal.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // get products attribute using redux
  const { productAttributes } = useSelector(
    (state) => state.productAttributeData
  );
  useEffect(() => {
    dispatch(loadProductAttributes(userDataFromLocal.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  // all inputs handler
  const onChangeHandler = (ev) => {
    let { name, value } = ev.target;
    setInventory({ ...inventory, [name]: value });
  };

  const [tags, setTags] = useState([]);
  // product tags functions
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  // subcategory filter by category
  const subcategoryFilter = useMemo(() => {
    return productSubCategories.rows?.filter(
      (data) => data.category_id === inventory.category_id
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventory.category_id]);

  // custom hook of toaster
  const toaster = useToaster();

  // add product function
  const productSubmitHandler = async (ev) => {
    ev.preventDefault();
    if (!inventory.name)
      toaster({ type: "error", content: "Please Enter Product Name !" });
    else if (!inventory.category_id)
      toaster({ type: "error", content: "Please Select Category !" });
    else if (!inventory.sub_category_id)
      toaster({ type: "error", content: "Please Select Subcategory !" });
    else if (!inventory.brand_id)
      toaster({ type: "error", content: "Please Select Brand !" });
    else if (!inventory.sku)
      toaster({ type: "error", content: "Please Enter SKU !" });
    else if (productImages.length <=0)
      toaster({ type: "error", content: "Please Upload Product Images !" });
    else if (
      inventory.is_variation === 0 &&
      !inventory.price &&
      !inventory.discount_price &&
      !inventory.quantity
    ) {
      toaster({
        type: "error",
        content:
          "Please Enter Product Price, Product Discount Price And Product Quantity  !",
      });
    } else if (
      inventory.is_variation === 1 &&
      !variationData.attribute &&
      !dynamicVariationField.variation &&
      !dynamicVariationField.price &&
      !dynamicVariationField.discount_price &&
      !dynamicVariationField.quantity
    ) {
      toaster({
        type: "error",
        content:
          "These Fields are mandatory Attribute, Variation, Price, Discount Price Quantity !",
      });
    } else if (!draftToHtml(convertToRaw(description.content.getCurrentContent())))
      toaster({ type: "error", content: "Please Enter Description !" });
    else if (inventory.is_flat_rate === 1 && !inventory.shipping_cost)
      toaster({ type: "error", content: "Please Shipping Cost !" });
    else if (!inventory.estimated_shipping_days)
      toaster({
        type: "error",
        content: "Please Enter Estimate Shipping Day !",
      });
    else if (inventory.status === 0)
      toaster({ type: "error", content: "Please Select Product Status !" });
    else {
      // This code is used for file upload
      const formData = new FormData();
      formData.append("uploadFor", "product");
      await productImages.map((imgObj) => {
        return formData.append("images", imgObj);
      });
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      await axios
        .post(
          `${import.meta.env.VITE_IP_URL}/api/uploadImages/`,
          formData,
          config
        )
        .then((res) => {
          // get all product images url
          console.log(res);
          inventory.images = JSON.stringify(res.data?.images);

          inventory.description = draftToHtml(convertToRaw(description.content.getCurrentContent())); 
          inventory.tags = JSON.stringify(tags); 
          inventory.tax = JSON.stringify(taxation);
          if (inventory.is_variation === 0) {
            setVariationData({ attribute: "", attribute_desc: [] });
            inventory.variation_description = "";
          } else if (inventory.is_variation === 1) {
            inventory.price = "";
            inventory.discount_price = "";
            inventory.quantity = "";
            inventory.variation_description = JSON.stringify(variationData);
          }
          console.log(inventory);
          dispatch(addProduct(inventory, userDataFromLocal.token));
          toaster({
            type: "success",
            content: "Product add successfully",
          });
          navigate("/dashboard/products");
        })
        .catch((err) => {
          toaster({
            type: "error",
            content: err.response.data.data.errorResult.message,
          });
        });
    }
  };

  // variation handler functionality
  const dynamicVariationFieldHandler = (e) => {
    e.preventDefault();
    if (!variationData.attribute)
      toaster({ type: "error", content: "Please Select Attribute !" });
    else if (!dynamicVariationField.variation)
      toaster({ type: "error", content: "Please Enter Variation !" });
    else if (!dynamicVariationField.price)
      toaster({ type: "error", content: "Please Enter Price !" });
    else if (!dynamicVariationField.discount_price)
      toaster({ type: "error", content: "Please Enter Discount Price !" });
    else if (!dynamicVariationField.quantity)
      toaster({ type: "error", content: "Please Enter Quantity !" });
    else {
      setVariationData({
        ...variationData,
        attribute_desc: [
          ...variationData.attribute_desc,
          dynamicVariationField,
        ],
      });
      setDynamicVariationField({
        variation: "",
        price: "",
        discount_price: "",
        quantity: "",
      });
    }
  };

  // this code is used for multiple images
  const imagesHandler = (e) => {
    setProductImages([...productImages, ...e.target.files]);
  };

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Add Product
        </Typography>
        <FormGroup>
          <Box className="grid grid-cols-12 gap-6">
            <Box className="col-span-8">
              {/* First Left Side Section */}

              <Box className="shadow overflow-hidden sm:rounded-md">
                <Box className="px-4 py-5 bg-white sm:p-3">
                  <Typography
                    component={"h1"}
                    className="mb-4 text-xl md:text-2xl text-black"
                  >
                    PRODUCT INFORMATION
                  </Typography>

                  <Box className="px-4 py-5 bg-white sm:p-3">
                    <Box className="grid grid-cols-0 gap-6">
                      <Box className="col-span-12 sm:col-span-3">
                        <InputLabel variant={"dark"} required={true}>
                          Product Name
                        </InputLabel>
                        <InputField
                          name="name"
                          type="text"
                          required
                          variant={"primary"}
                          placeholder="Product Name"
                          value={inventory.name}
                          onChange={onChangeHandler}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box className="App"></Box>

                  <Box className="px-4 py-5 bg-white sm:p-3">
                    <Box className="col-span-6 sm:col-span-3">
                      <InputLabel variant={"dark"} required={true}>
                        Category
                      </InputLabel>
                      {/* display category selection */}
                      <ReactSelect
                        options={
                          productCategories?.rows &&
                          productCategories?.rows.map(
                            ({ category_id, category_name }) => {
                              return {
                                value: category_id,
                                label: category_name,
                              };
                            }
                          )
                        }
                        className="mt-1"
                        onChange={(e) =>
                          setInventory({
                            ...inventory,
                            category_id: e.value,
                            sub_category_id: "",
                          })
                        }
                      />
                    </Box>
                  </Box>

                  <Box className="px-4 py-5 bg-white sm:p-3">
                    <Box className="col-span-6 sm:col-span-3">
                      <InputLabel variant={"dark"}>Subcategory</InputLabel>
                      {/* display subcategory selection */}
                      <ReactSelect
                        options={
                          subcategoryFilter &&
                          subcategoryFilter?.map(
                            ({ sub_category_id, sub_category_name }) => {
                              return {
                                value: sub_category_id,
                                label: sub_category_name,
                              };
                            }
                          )
                        }
                        className="mt-1"
                        onChange={(e) =>
                          setInventory({
                            ...inventory,
                            sub_category_id: e.value,
                          })
                        }
                      />
                    </Box>
                  </Box>

                  <Box className="px-4 py-5 bg-white sm:p-3">
                    <Box className="col-span-6 sm:col-span-3">
                      <InputLabel variant={"dark"} required={true}>
                        Brand
                      </InputLabel>
                      {/* display brand selection */}
                      <ReactSelect
                        options={
                          productBrands?.rows &&
                          productBrands?.rows.map(
                            ({ brand_id, brand_name }) => {
                              return {
                                value: brand_id,
                                label: brand_name,
                              };
                            }
                          )
                        }
                        className="mt-1"
                        onChange={(e) =>
                          setInventory({ ...inventory, brand_id: e.value })
                        }
                      />
                    </Box>
                  </Box>

                  <Box className="px-4 py-5 bg-white sm:p-3">
                    <Box className="grid grid-cols-0 gap-6">
                      <Box className="col-span-12 sm:col-span-3">
                        <InputLabel variant={"dark"} required={true}>
                          SKU
                        </InputLabel>
                        <InputField
                          name="sku"
                          type="text"
                          required
                          variant={"primary"}
                          placeholder="SKU"
                          value={inventory.sku}
                          onChange={onChangeHandler}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box className="px-4 py-5 bg-white sm:p-3">
                    <Box>
                      <InputLabel variant={"dark"} required={true}>
                        Product Images
                      </InputLabel>
                      <Box className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <Box className="space-y-1 text-center flex flex-col items-center">
                          {productImages.length === 0 ? (
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <Box className="grid grid-cols-3">
                              {productImages &&
                                productImages.map((item, i) => {
                                  return (
                                    <ImageListItem key={i} className="m-2">
                                      <Image
                                        source={`${URL.createObjectURL(item)}`}
                                        srcSet={`${URL.createObjectURL(
                                          item
                                        )}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={i}
                                        loading="lazy"
                                      />
                                      <ImageListItemBar
                                        sx={{
                                          background:
                                            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                                        }}
                                        position="top"
                                        actionIcon={
                                          <IconButton
                                            sx={{ color: "white" }}
                                            aria-label={`star`}
                                            onClick={() =>
                                              setProductImages(
                                                productImages.filter(
                                                  (pro) =>
                                                    pro.lastModified !==
                                                    item.lastModified
                                                )
                                              )
                                            }
                                          >
                                            <CancelIcon />
                                          </IconButton>
                                        }
                                        actionPosition="right"
                                      />
                                    </ImageListItem>
                                  );
                                })}
                            </Box>
                          )}
                          <Box className="flex text-sm text-gray-600">
                            <InputLabel
                              jsxFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <Typography>Upload a file</Typography>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                                onChange={imagesHandler}
                              />
                            </InputLabel>
                            <Typography component={"p"} className="pl-1">
                              or drag and drop
                            </Typography>
                          </Box>
                          <Typography
                            component={"p"}
                            className="text-xs text-gray-500"
                          >
                            PNG, JPG, GIF up to 10MB
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Second Left Side Section */}

              <Box className="shadow overflow-hidden sm:rounded-md mt-6">
                <Box className="px-4 py-5 bg-white sm:p-3">
                  <Typography
                    component={"h1"}
                    className="mb-4 text-xl md:text-2xl text-black"
                  >
                    TAGS
                  </Typography>
                  <Box className="px-4 py-5 bg-white sm:p-3">
                    <Box className="col-span-6 sm:col-span-3">
                      <InputLabel variant={"dark"}>Tags</InputLabel>
                      <ReactTags
                        tags={tags}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        handleTagClick={handleTagClick}
                        inputFieldPosition="top"
                      />
                      <InputLabel variant={"dark"}>
                        Type any word related to your product & enter space.
                        This will create tag & use for search your product based
                        on this.
                      </InputLabel>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Third Left Side Section */}

              <Box className="shadow sm:rounded-md mt-6">
                <Box className="px-4 py-5 bg-white sm:p-3">
                  <Typography
                    component={"h1"}
                    className="mb-4 text-xl md:text-2xl text-black"
                  >
                    PRODUCT PRICE + VARIATION
                  </Typography>
                  <Box className="px-4 py-5 bg-white sm:p-3 grid grid-cols-12 items-center">
                    <Box className="col-span-6 sm:col-span-3">
                      <InputLabel variant={"dark"}>
                        IS VARIATION AVAILABLE ?
                      </InputLabel>
                    </Box>
                    <Box className="col-span-6 sm:col-span-3">
                      <Switch
                        onChange={() => {
                          setInventory({
                            ...inventory,
                            is_variation: inventory.is_variation === 0 ? 1 : 0,
                          });
                        }}
                        checked={inventory.is_variation === 0 ? false : true}
                        className="react-switch"
                      />
                    </Box>
                  </Box>

                  {inventory.is_variation === 0 ? (
                    <>
                      <Box className="px-4 py-5 bg-white sm:p-3">
                        <Box className="grid grid-cols-0 gap-6">
                          <Box className="col-span-12 sm:col-span-3">
                            <InputLabel variant={"dark"} required={true}>
                              Product Price
                            </InputLabel>
                            <InputField
                              name="price"
                              type="text"
                              required
                              variant={"primary"}
                              placeholder="Product Price"
                              value={inventory.price}
                              onChange={onChangeHandler}
                              onKeyPress={(e) =>
                                inputRestrictions({
                                  evt: e,
                                  length: 7,
                                  string: false,
                                })
                              }
                            />
                          </Box>
                        </Box>
                      </Box>

                      <Box className="px-4 py-5 bg-white sm:p-3">
                        <Box className="grid grid-cols-0 gap-6">
                          <Box className="col-span-12 sm:col-span-3">
                            <InputLabel variant={"dark"} required={true}>
                              Discounted Price
                            </InputLabel>
                            <InputField
                              name="discount_price"
                              type="text"
                              required
                              variant={"primary"}
                              placeholder="Discounted Price"
                              value={inventory.discount_price}
                              onChange={onChangeHandler}
                              onKeyPress={(e) =>
                                inputRestrictions({
                                  evt: e,
                                  length: 7,
                                  string: false,
                                })
                              }
                            />
                          </Box>
                        </Box>
                      </Box>

                      <Box className="px-4 py-5 bg-white sm:p-3">
                        <Box className="grid grid-cols-0 gap-6">
                          <Box className="col-span-12 sm:col-span-3">
                            <InputLabel variant={"dark"} required={true}>
                              Product Quantity
                            </InputLabel>
                            <InputField
                              name="quantity"
                              type="text"
                              required
                              variant={"primary"}
                              placeholder="Product Quantity"
                              value={inventory.quantity}
                              onChange={onChangeHandler}
                              onKeyPress={(e) =>
                                inputRestrictions({
                                  evt: e,
                                  length: 7,
                                  string: false,
                                })
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box className="px-4 py-5 bg-white sm:p-3">
                        <Box className="col-span-6 sm:col-span-3">
                          <InputLabel variant={"dark"} required={true}>
                            Attribute
                          </InputLabel>
                          {/* display attribute selection */}
                          <ReactSelect
                            options={
                              productAttributes?.rows &&
                              productAttributes?.rows.map(
                                ({ attribute_id, attribute_name }) => {
                                  return {
                                    value: attribute_id,
                                    label: attribute_name,
                                  };
                                }
                              )
                            }
                            className="mt-1"
                            onChange={(e) =>
                              setVariationData({
                                ...variationData,
                                attribute: e.label,
                              })
                            }
                          />
                          <Box className="grid grid-cols-5 gap-3 items-end mt-3">
                            <Box>
                              <InputLabel variant={"dark"} required={true}>
                                Variation
                              </InputLabel>
                              <InputField
                                name="variation"
                                type="text"
                                required
                                variant={"primary"}
                                placeholder="Variation"
                                value={dynamicVariationField.variation}
                                onChange={(e) => {
                                  setDynamicVariationField({
                                    ...dynamicVariationField,
                                    variation: e.target.value,
                                  });
                                }}
                              />
                            </Box>
                            <Box>
                              <InputLabel variant={"dark"} required={true}>
                                Price
                              </InputLabel>
                              <InputField
                                name="price"
                                type="text"
                                required
                                variant={"primary"}
                                placeholder="Price"
                                value={dynamicVariationField.price}
                                onChange={(e) => {
                                  setDynamicVariationField({
                                    ...dynamicVariationField,
                                    price: e.target.value,
                                  });
                                }}
                                onKeyPress={(e) =>
                                  inputRestrictions({
                                    evt: e,
                                    length: 7,
                                    string: false,
                                  })
                                }
                              />
                            </Box>
                            <Box>
                              <InputLabel variant={"dark"} required={true}>
                                Discount Price
                              </InputLabel>
                              <InputField
                                name="discount"
                                type="text"
                                required
                                variant={"primary"}
                                placeholder="Discount Price"
                                value={dynamicVariationField.discount_price}
                                onChange={(e) => {
                                  setDynamicVariationField({
                                    ...dynamicVariationField,
                                    discount_price: e.target.value,
                                  });
                                }}
                                onKeyPress={(e) =>
                                  inputRestrictions({
                                    evt: e,
                                    length: 7,
                                    string: false,
                                  })
                                }
                              />
                            </Box>
                            <Box>
                              <InputLabel variant={"dark"} required={true}>
                                Quantity
                              </InputLabel>
                              <InputField
                                name="quantity"
                                type="text"
                                required
                                variant={"primary"}
                                placeholder="Quantity"
                                value={dynamicVariationField.quantity}
                                onChange={(e) => {
                                  setDynamicVariationField({
                                    ...dynamicVariationField,
                                    quantity: e.target.value,
                                  });
                                }}
                                onKeyPress={(e) =>
                                  inputRestrictions({
                                    evt: e,
                                    length: 7,
                                    string: false,
                                  })
                                }
                              />
                            </Box>
                            <Box>
                              <CtaButton
                                className="rounded-full"
                                variant={"primary"}
                                onClick={dynamicVariationFieldHandler}
                              >
                                <AddIcon />
                              </CtaButton>
                            </Box>
                          </Box>
                          {variationData.attribute_desc &&
                            variationData.attribute_desc.map(
                              (
                                { variation, price, discount_price, quantity },
                                i
                              ) => {
                                return (
                                  <Box
                                    className="grid grid-cols-5 gap-3 items-end mt-5"
                                    key={i}
                                  >
                                    <Box>
                                      <InputField
                                        name="sku"
                                        type="text"
                                        required
                                        variant={"primary"}
                                        placeholder="Variation"
                                        value={variation}
                                        readOnly
                                      />
                                    </Box>
                                    <Box>
                                      <InputField
                                        name="sku"
                                        type="text"
                                        required
                                        variant={"primary"}
                                        placeholder="Price"
                                        value={price}
                                        readOnly
                                      />
                                    </Box>
                                    <Box>
                                      <InputField
                                        name="sku"
                                        type="text"
                                        required
                                        variant={"primary"}
                                        placeholder="Discount Price"
                                        value={discount_price}
                                        readOnly
                                      />
                                    </Box>
                                    <Box>
                                      <InputField
                                        name="sku"
                                        type="text"
                                        required
                                        variant={"primary"}
                                        placeholder="Quantity"
                                        value={quantity}
                                        readOnly
                                      />
                                    </Box>
                                    <Box>
                                      <CtaButton
                                        variant={"primary"}
                                        className={"rounded-full"}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setVariationData({
                                            ...variationData,
                                            attribute_desc:
                                              variationData.attribute_desc.filter(
                                                (fil) =>
                                                  fil.variation !== variation
                                              ),
                                          });
                                        }}
                                      >
                                        <CancelIcon />
                                      </CtaButton>
                                    </Box>
                                  </Box>
                                );
                              }
                            )}
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>

              {/* Fourth Left Side Section */}

              <Box className="shadow overflow-hidden sm:rounded-md mt-6">
                <Box className="px-4 py-5 bg-white sm:p-3">
                  <Typography
                    component={"h1"}
                    className="mb-4 text-xl md:text-2xl text-black"
                  >
                    PRODUCT DESCRIPTION
                  </Typography>

                  <Box className="px-4 py-5 bg-white sm:p-3">
                    <Box className="grid grid-cols-0 gap-6">
                      <Box className="col-span-12 sm:col-span-3">
                        <InputLabel variant={"dark"} required={true}>
                          Product Description
                        </InputLabel>
                        <TextEditor editorState={description} setEditorState={setDescription} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="col-span-4">
              {/* First Right Side Section */}

              <Box className="shadow overflow-hidden sm:rounded-md">
                <Box className="px-4 py-5 bg-white sm:p-3">
                  <Typography
                    component={"h1"}
                    className="mb-4 text-xl md:text-2xl text-black"
                  >
                    SHIPPING CONFIGURATION
                  </Typography>
                  <Box className="px-4 py-5 bg-white sm:p-3 grid grid-cols-2 items-center">
                    <Box className="col-span-1">
                      <InputLabel variant={"dark"}>Free Shipping</InputLabel>
                    </Box>
                    <Box className="col-span-1 flex items-center">
                      <Switch
                        onChange={() => {
                          setInventory({
                            ...inventory,
                            is_free_shipping:
                              inventory.is_free_shipping === 0 ? 1 : 0,
                            is_flat_rate: 0,
                          });
                        }}
                        checked={
                          inventory.is_free_shipping === 0 ? false : true
                        }
                        className="react-switch"
                      />
                    </Box>
                  </Box>

                  <Box className="px-4 py-5 bg-white sm:p-3 grid grid-cols-2 items-center">
                    <Box className="col-span-1">
                      <InputLabel variant={"dark"}>Flat Rate</InputLabel>
                    </Box>
                    <Box className="col-span-1 flex items-center">
                      <Switch
                        onChange={() => {
                          setInventory({
                            ...inventory,
                            is_flat_rate: inventory.is_flat_rate === 0 ? 1 : 0,
                            is_free_shipping: 0,
                          });
                        }}
                        checked={inventory.is_flat_rate === 0 ? false : true}
                        className="react-switch"
                      />
                    </Box>
                  </Box>
                  {inventory.is_flat_rate === 1 && (
                    <Box className="p-3">
                      <InputLabel variant={"dark"} required={true}>
                        Shipping Cost
                      </InputLabel>
                      <InputField
                        name="shipping_cost"
                        type="text"
                        required
                        variant={"primary"}
                        placeholder="Shipping Cost"
                        value={inventory.shipping_cost}
                        onChange={onChangeHandler}
                        onKeyPress={(e) =>
                          inputRestrictions({
                            evt: e,
                            length: 7,
                            string: false,
                          })
                        }
                      />
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Second Right Side Section */}

              <Box className="shadow overflow-hidden sm:rounded-md mt-6">
                <Box className="px-4 py-5 bg-white sm:p-3">
                  <Typography
                    component={"h1"}
                    className="mb-4 text-xl md:text-2xl text-black"
                  >
                    RETURN POLICY
                  </Typography>
                  <Box className="px-4 py-5 bg-white sm:p-3 grid grid-cols-2 items-center">
                    <Box className="col-span-1">
                      <InputLabel variant={"dark"}>
                        Return Available ?
                      </InputLabel>
                    </Box>
                    <Box className="col-span-1 flex items-center">
                      <Switch
                        onChange={() => {
                          setInventory({
                            ...inventory,
                            is_return: inventory.is_return === 0 ? 1 : 0,
                          });
                        }}
                        checked={inventory.is_return === 0 ? false : true}
                        className="react-switch"
                      />
                    </Box>
                  </Box>
                  {inventory.is_return === 1 && (
                    <Box className="p-3">
                      <InputLabel variant={"dark"} required={true}>
                        Return Days
                      </InputLabel>
                      <InputField
                        name="return_days"
                        type="text"
                        required
                        variant={"primary"}
                        placeholder="Return Days"
                        value={inventory.return_days}
                        onChange={onChangeHandler}
                        onKeyPress={(e) =>
                          inputRestrictions({
                            evt: e,
                            length: 5,
                            string: false,
                          })
                        }
                      />
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Third Right Side Section */}

              <Box className="shadow overflow-hidden sm:rounded-md mt-6">
                <Box className="px-4 py-5 bg-white sm:p-3">
                  <Typography
                    component={"h1"}
                    className="mb-4 text-xl md:text-2xl text-black"
                  >
                    FEATURED
                  </Typography>
                  <Box className="px-4 py-5 bg-white sm:p-3 grid grid-cols-2 items-center">
                    <Box className="col-span-1">
                      <InputLabel variant={"dark"}>Status</InputLabel>
                    </Box>
                    <Box className="col-span-1 flex items-center">
                      <Switch
                        onChange={() => {
                          setInventory({
                            ...inventory,
                            is_featured: inventory.is_featured === 0 ? 1 : 0,
                          });
                        }}
                        checked={inventory.is_featured === 0 ? false : true}
                        className="react-switch"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Fourth Right Side Section */}

              <Box className="shadow overflow-hidden sm:rounded-md mt-6">
                <Box className="px-4 py-5 bg-white sm:p-3">
                  <Typography
                    component={"h1"}
                    className="mb-4 text-xl md:text-2xl text-black"
                  >
                    ESTIMATE SHIPPING TIME
                  </Typography>
                  <Box className="px-4 py-5 bg-white sm:p-3">
                    <InputLabel variant={"dark"} required={true}>
                      Shipping Days
                    </InputLabel>
                    <InputField
                      name="estimated_shipping_days"
                      type="text"
                      required
                      variant={"primary"}
                      placeholder="Shipping Days"
                      value={inventory.estimated_shipping_days}
                      onChange={onChangeHandler}
                      onKeyPress={(e) =>
                        inputRestrictions({ evt: e, length: 5, string: false })
                      }
                    />
                  </Box>
                </Box>
              </Box>

              {/* Fifth Right Side Section */}

              <Box className="shadow overflow-hidden sm:rounded-md mt-6">
                <Box className="px-4 py-5 bg-white sm:p-3">
                  <Typography
                    component={"h1"}
                    className="mb-4 text-xl md:text-2xl text-black"
                  >
                    VAT & TAX
                  </Typography>
                  <Box className="px-4 py-5 bg-white sm:p-3">
                    <InputLabel variant={"dark"} required={true}>
                      Tax
                    </InputLabel>
                    <InputField
                      name="tax"
                      type="text"
                      required
                      variant={"primary"}
                      placeholder="Amount"
                      value={taxation.amount}
                      onChange={(e) =>
                        setTaxation({ ...taxation, amount: e.target.value })
                      }
                      onKeyPress={(e) =>
                        inputRestrictions({ evt: e, length: 7, string: false })
                      }
                    />

                    <InputLabel
                      variant={"dark"}
                      required={true}
                      className={"mt-4"}
                    >
                      Type
                    </InputLabel>
                    <Select
                      id="country"
                      name="country"
                      value={taxation.type}
                      onChange={(e) =>
                        setTaxation({ ...taxation, type: e.target.value })
                      }
                    >
                      <Select.Item>None</Select.Item>
                      <Select.Item>Fixed</Select.Item>
                      <Select.Item>Percentage</Select.Item>
                    </Select>
                  </Box>
                </Box>
              </Box>

              <Box className="shadow overflow-hidden sm:rounded-md mt-6">
                <Box className="px-4 py-5 bg-white sm:p-3">
                  <Typography
                    component={"h1"}
                    className="mb-4 text-xl md:text-2xl text-black"
                  >
                    Product Status
                  </Typography>
                  <Box className="px-4 py-5 bg-white sm:p-3 grid grid-cols-2 items-center">
                    <Box className="col-span-1">
                      <InputLabel variant={"dark"}>Status</InputLabel>
                    </Box>
                    <Box className="col-span-1 flex items-center">
                      <Switch
                        onChange={() => {
                          setInventory({
                            ...inventory,
                            status: inventory.status === 0 ? 1 : 0,
                          });
                        }}
                        checked={inventory.status === 0 ? false : true}
                        className="react-switch"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Footer
            to={"/dashboard/products"}
            onClick={productSubmitHandler}
            text={"Add"}
          />
        </FormGroup>
      </Box.Section>
      '
    </>
  );
};

export default AddProduct;
