import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../../components/Core/Box/Box";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import { FormGroup, InputLabel } from "../../../components/Core/Form/FormGroup";
import Typography from "../../../components/Core/Typography/Typography";
import Footer from "../../../components/Outlet/Footer";
import TextEditor from "../../../components/TextEditor/TextEditor";
import useToaster from "../../../hooks/useToaster";
import {
  loadAboutPage,
  updateAboutPage,
} from "../../../Services/Actions/customPagesAction";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

const About = () => {
  const [about, setAbout] = useState({ content: EditorState.createEmpty() });
  const [pageId, setPageId] = useState("");
  const { aboutPage } = useSelector((state) => state.customPagesData);

  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );

  const dispatch = useDispatch();

  // custom hook of toaster
  const toaster = useToaster();

  // store page into database
  const submitPage = (ev) => {
    ev.preventDefault();
    if (!about.content)
      toaster({ type: "error", content: "Please Enter About us data !" });
    else if (
      JSON.stringify(about.content) === JSON.stringify(aboutPage?.rows?.content)
    )
      toaster({ type: "error", content: "Please Update something!" });
    else {
      const pageContent = {
        content: draftToHtml(convertToRaw(about.content.getCurrentContent())),
      };
      dispatch(updateAboutPage(pageContent, pageId, userDataFromLocal.token));
      toaster({ type: "success", content: "Update successfully" });
    }
  };
  useEffect(() => {
    dispatch(loadAboutPage(userDataFromLocal?.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    aboutPage?.rows
      ? setAbout({
          content: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(aboutPage?.rows?.content)
            )
          ),
        })
      : setAbout({ content: EditorState.createEmpty() });
    aboutPage?.rows ? setPageId(aboutPage?.rows?.id) : setPageId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aboutPage]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          About us
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    About us
                  </InputLabel>

                  <TextEditor editorState={about} setEditorState={setAbout} />
                </Box>
              </Box>
            </Box>

            <Footer onClick={submitPage} text={"Update"} />
          </Box>
        </FormGroup>
      </Box.Section>
      '
    </>
  );
};

export default About;
