import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../../components/Core/Box/Box";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputField,
  InputLabel,
} from "../../../components/Core/Form/FormGroup";
import Typography from "../../../components/Core/Typography/Typography";
import Footer from "../../../components/Outlet/Footer";
import useToaster from "../../../hooks/useToaster";
import {
  loadRefundPage,
  updateRefundPage,
} from "../../../Services/Actions/customPagesAction";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import TextEditor from "../../../components/TextEditor/TextEditor";

const RefundPolicy = () => {
  const [refund, setRefund] = useState({ content: EditorState.createEmpty() });
  const { refundPage } = useSelector((state) => state.customPagesData);
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
    if (!refund)
      toaster({ type: "error", content: "Please Enter Return Policy data !" });
    else if (
      JSON.stringify(refund.content) ===
      JSON.stringify(refundPage?.rows?.content)
    )
      toaster({ type: "error", content: "Please Update something!" });
    else {
      const pageContent = {
        content: draftToHtml(convertToRaw(refund.content.getCurrentContent())),
      };
      dispatch(updateRefundPage(pageContent, pageId, userDataFromLocal.token));
      toaster({ type: "success", content: "Update successfully" });
    }
  };
  useEffect(() => {
    dispatch(loadRefundPage(userDataFromLocal?.token));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refundPage?.rows
      ? setRefund({
          content: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(refundPage?.rows?.content)
            )
          ),
        })
      : setRefund({ content: EditorState.createEmpty() });
      refundPage?.rows ? setPageId(refundPage?.rows?.id) : setPageId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refundPage]);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Return Policy
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Return Policy
                  </InputLabel>
                  <TextEditor editorState={refund} setEditorState={setRefund} />

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

export default RefundPolicy;
