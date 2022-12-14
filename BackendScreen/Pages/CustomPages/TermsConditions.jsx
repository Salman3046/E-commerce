import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../../components/Core/Box/Box";
import {
  FormGroup,
  InputField,
  InputLabel,
} from "../../../components/Core/Form/FormGroup";
import Typography from "../../../components/Core/Typography/Typography";
import Footer from "../../../components/Outlet/Footer";
import useToaster from "../../../hooks/useToaster";
import {
  loadTermsPage,
  updateTermsPage,
} from "../../../Services/Actions/customPagesAction";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import TextEditor from "../../../components/TextEditor/TextEditor";

const TermsConditions = () => {
  const [terms, setTerms] = useState({ content: EditorState.createEmpty() });
  const { termsPage } = useSelector((state) => state.customPagesData);
  const [pageId, setPageId] = useState("");

  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );

  const dispatch = useDispatch();

  // custom hook of toaster
  const toaster = useToaster();

  // store page into database
  const submitPage = (ev) => {
    ev.preventDefault();
    if (!terms)
      toaster({
        type: "error",
        content: "Please Enter Terms Conditions data !",
      });
    else if (
      JSON.stringify(terms.content) === JSON.stringify(termsPage?.rows?.content)
    )
      toaster({ type: "error", content: "Please Update something!" });
    else {
      const pageContent = {
        content: draftToHtml(convertToRaw(terms.content.getCurrentContent())),
      };
      dispatch(updateTermsPage(pageContent, pageId, userDataFromLocal.token));
      toaster({ type: "success", content: "Update successfully" });
    }
  };
  useEffect(() => {
    dispatch(loadTermsPage(userDataFromLocal?.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    termsPage?.rows
      ? setTerms({
          content: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(termsPage?.rows?.content)
            )
          ),
        })
      : setTerms({ content: EditorState.createEmpty() });
      termsPage?.rows ? setPageId(termsPage?.rows?.id) : setPageId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termsPage]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Terms & Conditions
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Terms & Conditions
                  </InputLabel>
                  <TextEditor editorState={terms} setEditorState={setTerms} />

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

export default TermsConditions;
