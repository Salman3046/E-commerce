import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToaster from "../../../hooks/useToaster";

import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import useImageUpload from "../../../hooks/useImageUpload";
import {
  loadSiteSettings,
  updateSiteSettings,
} from "../../../Services/Actions/siteSettingAction";
import axios from "axios";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputField,
  InputLabel,
} from "../../../components/Core/Form/FormGroup";
import Typography from "../../../components/Core/Typography/Typography";
import Image from "../../../components/Core/Image/Image";
import Box from "../../../components/Core/Box/Box";
import inputRestrictions from "../../../components/InputRestrictions/inputRestrictions";
import Footer from "../../../components/Outlet/Footer";

const Settings = () => {
  const [settings, setSettings] = useState({
    currency: "",
    logo: "",
    favicon: "",
    copyright: "",
    address: "",
    contact: "",
    email: "",
    site_title: "",
    meta_title: "",
    meta_description: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    playstore: "",
    appstore: "",
  });

  const [tempImages, setTempImages] = useState({ logo: "", favicon: "" });

  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );
  const { siteSettings } = useSelector((state) => state.siteSettingData);
  const dispatch = useDispatch();

  // custom hook of toaster
  const toaster = useToaster();
  // custom hook of useImage Upload
  const [getImageFile, deleteImageFile] = useImageUpload();

  // inputs handler
  const onChangeHandler = (ev) => {
    let { name, value } = ev.target;
    setSettings({ ...settings, [name]: value });
  };

  // store site settings into database
  const submitSettings = (ev) => {
    ev.preventDefault();
    if (!settings.currency)
      toaster({ type: "error", content: "Please Enter Currency !" });
    else if (!settings.logo)
      toaster({ type: "error", content: "Please Upload Logo !" });
    else if (!settings.favicon)
      toaster({ type: "error", content: "Please Upload Favicon !" });
    else if (!settings.copyright)
      toaster({ type: "error", content: "Please Enter Copyright !" });
    else if (!settings.address)
      toaster({ type: "error", content: "Please Enter Address !" });
    else if (!settings.contact)
      toaster({ type: "error", content: "Please Enter Contact !" });
    else if (!settings.email)
      toaster({ type: "error", content: "Please Enter Email !" });
    else if (!settings.site_title)
      toaster({ type: "error", content: "Please Enter Site Title !" });
    else if (!settings.meta_title)
      toaster({ type: "error", content: "Please Enter Meta Title !" });
    else if (!settings.meta_description)
      toaster({
        type: "error",
        content: "Please Enter Meta Description !",
      });
    else if (!settings.facebook)
      toaster({ type: "error", content: "Please Enter Facebook Link !" });
    else if (!settings.twitter)
      toaster({ type: "error", content: "Please Enter Twitter Link !" });
    else if (!settings.instagram)
      toaster({ type: "error", content: "Please Enter Instagram Link !" });
    else if (!settings.linkedin)
      toaster({ type: "error", content: "Please Enter LinkedIn Link !" });
    else if (!settings.playstore)
      toaster({ type: "error", content: "Please Enter Playstore Link !" });
    else if (!settings.appstore)
      toaster({ type: "error", content: "Please Enter Appstore Link !" });
    else if (JSON.stringify(settings) === JSON.stringify(siteSettings?.rows))
      toaster({ type: "error", content: "Please update before submit !" });
    else {
      // This code is used for file upload
      const formData = new FormData();
      formData.append("uploadFor", "logo");
      formData.append("images", settings.logo);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      settings.logo?.name
        ? axios
            .post(
              `${import.meta.env.VITE_IP_URL}/api/uploadImages/`,
              formData,
              config
            )
            .then((res) => {
              settings.logo = res.data?.images[0];
              if (settings.favicon?.name) {
                const formData2 = new FormData();
                formData2.append("uploadFor", "favicon");
                formData2.append("images", settings.favicon);
                axios
                  .post(
                    `${import.meta.env.VITE_IP_URL}/api/uploadImages/`,
                    formData2,
                    config
                  )
                  .then((res) => {
                    settings.favicon = res.data?.images[0];
                    dispatch(
                      updateSiteSettings(
                        settings,
                        import.meta.env.VITE_SITE_SETTINGS_ID,
                        userDataFromLocal?.token
                      )
                    );
                    toaster({
                      type: "success",
                      content: "Update successfully",
                    });
                    window.scrollTo(0, 0);
                  })
                  .catch((err) => {
                    toaster({
                      type: "error",
                      content: err.response.data.data.errorResult.message,
                    });
                  });
              } else {
                dispatch(
                  updateSiteSettings(
                    settings,
                    import.meta.env.VITE_SITE_SETTINGS_ID,
                    userDataFromLocal?.token
                  )
                );
                toaster({
                  type: "success",
                  content: "Update successfully",
                });
              }
            })
            .catch((err) => {
              toaster({
                type: "error",
                content: err.response.data.data.errorResult.message,
              });
            })
        : settings.favicon?.name
        ? axios
            .post(
              `${import.meta.env.VITE_IP_URL}/api/uploadImages/`,
              formData,
              config
            )
            .then((res) => {
              settings.favicon = res.data?.images[0];

              if (settings.logo?.name) {
                formData.append("uploadFor", "logo");
                formData.append("images", settings.logo);
                axios
                  .post(
                    `${import.meta.env.VITE_IP_URL}/api/uploadImages/`,
                    formData,
                    config
                  )
                  .then((res) => {
                    settings.logo = res.data?.images[0];
                    dispatch(
                      updateSiteSettings(
                        settings,
                        import.meta.env.VITE_SITE_SETTINGS_ID,
                        userDataFromLocal?.token
                      )
                    );
                    toaster({
                      type: "success",
                      content: "Update successfully",
                    });
                    window.scrollTo(0, 0);
                  })
                  .catch((err) => {
                    toaster({
                      type: "error",
                      content: err.response.data.data.errorResult.message,
                    });
                  });
              } else {
                dispatch(
                  updateSiteSettings(
                    settings,
                    import.meta.env.VITE_SITE_SETTINGS_ID,
                    userDataFromLocal?.token
                  )
                );
                toaster({
                  type: "success",
                  content: "Update successfully",
                });
                window.scrollTo(0, 0);
              }
            })
            .catch((err) => {
              toaster({
                type: "error",
                content: err.response.data.data.errorResult.message,
              });
            })
        : dispatch(
            updateSiteSettings(
              settings,
              import.meta.env.VITE_SITE_SETTINGS_ID,
              userDataFromLocal?.token
            )
          );
      toaster({ type: "success", content: "Update successfully" });
      window.scrollTo(0, 0);
    }
  };
  useEffect(() => {
    dispatch(loadSiteSettings(userDataFromLocal?.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    siteSettings?.rows
      ? setSettings(siteSettings?.rows)
      : setSettings({
          currency: "",
          logo: "",
          favicon: "",
          copyright: "",
          address: "",
          contact: "",
          email: "",
          site_title: "",
          meta_title: "",
          meta_description: "",
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
          playstore: "",
          appstore: "",
        });
    siteSettings?.rows
      ? setTempImages({
          logo: siteSettings?.rows?.logo,
          favicon: siteSettings?.rows?.favicon,
        })
      : setTempImages({ logo: "", favicon: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteSettings]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Settings
        </Typography>
        <FormGroup>
          {/* First Section */}

          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Typography
                component={"h1"}
                className="mb-4 text-xl md:text-2xl text-black"
              >
                Basic Information
              </Typography>
              
              <Box className="grid grid-cols-0 gap-6 p-3">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Currency
                  </InputLabel>
                  <InputField
                    name="currency"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="₹"
                    value={settings.currency}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>

              <Box className="px-4 py-5 bg-white sm:p-3">
                <InputLabel variant={"dark"} required={true}>
                  Logo
                </InputLabel>
                <Box className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <Box className="space-y-1 text-center flex items-center flex-col">
                    {tempImages.logo ? (
                      <>
                        <Image
                          className="mx-auto h-20 w-auto"
                          source={`${import.meta.env.VITE_IP_URL}/${
                            tempImages.logo
                          }`}
                          alt=""
                        />
                        <CtaButton
                          variant={"primary"}
                          className={"mt-2"}
                          onClick={() =>
                            setTempImages({ ...tempImages, logo: "" })
                          }
                        >
                          Change
                        </CtaButton>
                      </>
                    ) : (
                      <>
                        <ImageUploader
                          onFileAdded={(img) => {
                            setSettings({
                              ...settings,
                              logo: getImageFile(img),
                            });
                          }}
                          onFileRemoved={() => {
                            setSettings({
                              ...settings,
                              logo: deleteImageFile(),
                            });
                          }}
                        />
                        <Box className="flex text-sm text-gray-600">
                          <InputLabel
                            jsxFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <Typography component={"p"} className="pl-1">
                              Upload Image or drag and drop
                            </Typography>
                          </InputLabel>
                        </Box>
                        <Typography
                          component={"p"}
                          className="text-xs text-gray-500"
                        >
                          {settings.logo?.name
                            ? settings.logo?.name
                            : "PNG, JPG and JPEG up to 10MB"}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box className="px-4 py-5 bg-white sm:p-3">
                <InputLabel variant={"dark"} required={true}>
                  Favicon
                </InputLabel>
                <Box className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <Box className="space-y-1 text-center flex items-center flex-col">
                    {tempImages.favicon ? (
                      <>
                        <Image
                          className="mx-auto h-20 w-auto"
                          source={`${import.meta.env.VITE_IP_URL}/${
                            tempImages.favicon
                          }`}
                          alt=""
                        />
                        <CtaButton
                          variant={"primary"}
                          className={"mt-2"}
                          onClick={() =>
                            setTempImages({ ...tempImages, favicon: "" })
                          }
                        >
                          Change
                        </CtaButton>
                      </>
                    ) : (
                      <>
                        <ImageUploader
                          onFileAdded={(img) => {
                            setSettings({
                              ...settings,
                              favicon: getImageFile(
                                img ? img : settings.favicon
                              ),
                            });
                          }}
                          onFileRemoved={() => {
                            setSettings({
                              ...settings,
                              favicon: deleteImageFile(),
                            });
                          }}
                        />
                        <Box className="flex text-sm text-gray-600">
                          <InputLabel
                            jsxFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <Typography component={"p"} className="pl-1">
                              Upload Image or drag and drop
                            </Typography>
                          </InputLabel>
                        </Box>
                        <Typography
                          component={"p"}
                          className="text-xs text-gray-500"
                        >
                          {settings.favicon?.name
                            ? settings.favicon?.name
                            : "PNG, JPG and JPEG up to 10MB"}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box className="grid grid-cols-0 gap-6 p-3">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Copyright
                  </InputLabel>
                  <InputField
                    name="copyright"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Copyright"
                    value={settings.copyright}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>

              <Box className="px-4 py-5 bg-white sm:p-3">
                <Box className="grid grid-cols-0 gap-6">
                  <Box className="col-span-12 sm:col-span-3">
                    <InputLabel variant={"dark"} required={true}>
                      Address
                    </InputLabel>
                    <Box className="mt-1">
                      <InputField
                        id="about"
                        name="address"
                        multiline={true}
                        rows={5}
                        variant={"primary"}
                        placeholder="Address"
                        value={settings.address}
                        onChange={onChangeHandler}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="px-4 py-5 bg-white sm:p-3">
                <Box className="grid grid-cols-0 gap-6">
                  <Box className="col-span-12 sm:col-span-3">
                    <InputLabel variant={"dark"} required={true}>
                      Contact
                    </InputLabel>
                    <InputField
                      name="contact"
                      type="text"
                      required=""
                      variant={"primary"}
                      placeholder="Contact"
                      value={settings.contact}
                      onChange={onChangeHandler}
                      onKeyPress={(e) =>
                        inputRestrictions({ evt: e, length: 10, string: false })
                      }
                    />
                  </Box>
                </Box>
              </Box>

              <Box className="px-4 py-5 bg-white sm:p-3">
                <Box className="grid grid-cols-0 gap-6">
                  <Box className="col-span-12 sm:col-span-3">
                    <InputLabel variant={"dark"} required={true}>
                      Email
                    </InputLabel>
                    <InputField
                      name="email"
                      type="email"
                      required=""
                      variant={"primary"}
                      placeholder="Email"
                      value={settings.email}
                      onChange={onChangeHandler}
                      onKeyPress={(e) =>
                        inputRestrictions({ evt: e, length: 30 })
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Second Section */}

          <Box className="shadow overflow-hidden sm:rounded-md mt-5">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Typography
                component={"h1"}
                className="mb-4 text-xl md:text-2xl text-black"
              >
                SEO
              </Typography>
              <Box className="grid grid-cols-0 gap-6 p-3">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Site Title
                  </InputLabel>
                  <InputField
                    name="site_title"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Site Title"
                    value={settings.site_title}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
              <Box className="grid grid-cols-0 gap-6 p-3">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Meta Title
                  </InputLabel>
                  <InputField
                    name="meta_title"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Meta Title"
                    value={settings.meta_title}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>

              <Box className="px-4 py-5 bg-white sm:p-3">
                <Box className="grid grid-cols-0 gap-6">
                  <Box className="col-span-12 sm:col-span-3">
                    <InputLabel variant={"dark"} required={true}>
                      Meta Description
                    </InputLabel>
                    <Box className="mt-1">
                      <InputField
                        id="about"
                        name="meta_description"
                        rows="5"
                        multiline={true}
                        variant={"primary"}
                        placeholder="Meta Description"
                        value={settings.meta_description}
                        onChange={onChangeHandler}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Third Section */}

          <Box className="shadow overflow-hidden sm:rounded-md mt-5">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Typography
                component={"h1"}
                className="mb-4 text-xl md:text-2xl text-black"
              >
                Social Media Accounts
              </Typography>
              <Box className="grid grid-cols-0 gap-6 p-3">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Facebook
                  </InputLabel>
                  <InputField
                    name="facebook"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Facebook"
                    value={settings.facebook}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
              <Box className="grid grid-cols-0 gap-6 p-3">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Twitter
                  </InputLabel>
                  <InputField
                    name="twitter"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Twitter"
                    value={settings.twitter}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
              <Box className="grid grid-cols-0 gap-6 p-3">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Instagram
                  </InputLabel>
                  <InputField
                    name="instagram"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Instagram"
                    value={settings.instagram}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
              <Box className="grid grid-cols-0 gap-6 p-3">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    LinkedIn
                  </InputLabel>
                  <InputField
                    name="linkedin"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="LinkedIn"
                    value={settings.linkedin}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Fourth Section */}

          <Box className="shadow overflow-hidden sm:rounded-md mt-5">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Typography
                component={"h1"}
                className="mb-4 text-xl md:text-2xl text-black"
              >
                Footer Links
              </Typography>
              <Box className="grid grid-cols-0 gap-6 p-3">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Play Store
                  </InputLabel>
                  <InputField
                    name="playstore"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Play Store"
                    value={settings.playstore}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
              <Box className="grid grid-cols-0 gap-6 p-3">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    App Store
                  </InputLabel>
                  <InputField
                    name="appstore"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="App Store"
                    value={settings.appstore}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
            </Box>
            <Footer onClick={submitSettings} text={"Update"} />
          </Box>
        </FormGroup>
      </Box.Section>
      '
    </>
  );
};

export default Settings;
