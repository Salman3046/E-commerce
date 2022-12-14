import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addFaq } from "../../../Services/Actions/faqAction";
import { useDispatch } from "react-redux";
import useToaster from "../../../hooks/useToaster";
import CtaButton from "../../../components/Core/Cta/CtaButton";
import {
  FormGroup,
  InputField,
  InputLabel,
} from "../../../components/Core/Form/FormGroup";
import Typography from "../../../components/Core/Typography/Typography";
import Status from "../../../components/StatusSelection/Status";
import Box from "../../../components/Core/Box/Box";
import Footer from "../../../components/Outlet/Footer";

const AddFaq = () => {
  const [inventory, setInventory] = useState({
    question: "",
    answer: "",
    status: "",
  });

  const userDataFromLocal = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH)
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // custom hook of toaster
  const toaster = useToaster();

  // inputs handler
  const onChangeHandler = (ev) => {
    let { name, value } = ev.target;
    setInventory({ ...inventory, [name]: value });
  };

  // store faq into database
  const submitInventory = (ev) => {
    ev.preventDefault();

    if (!inventory.question)
      toaster({ type: "error", content: "Please Enter Question !" });
    else if (!inventory.answer)
      toaster({ type: "error", content: "Please Enter Answer  !" });
    else if (!inventory.status)
      toaster({ type: "error", content: "Please Select Status !" });
    else {
      dispatch(addFaq(inventory, userDataFromLocal.token));
      setInventory({
        question: "",
        answer: "",
        status: "",
      });
      toaster({ type: "success", content: "Faq add successfully" });
      navigate("/dashboard/faqs");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Box.Section className="container p-6 mx-auto">
        <Typography
          component={"h1"}
          className="mb-4 text-xl md:text-2xl font-semibold text-black"
        >
          Add Faq
        </Typography>
        <FormGroup>
          <Box className="shadow overflow-hidden sm:rounded-md">
            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Question
                  </InputLabel>
                  <InputField
                    name="question"
                    type="text"
                    required=""
                    variant={"primary"}
                    placeholder="Question"
                    value={inventory.question}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="grid grid-cols-0 gap-6">
                <Box className="col-span-12 sm:col-span-3">
                  <InputLabel variant={"dark"} required={true}>
                    Answer
                  </InputLabel>
                  <InputField
                    id="about"
                    name="answer"
                    rows="7"
                    variant={"primary"}
                    multiline={true}
                    placeholder="Answer"
                    value={inventory.answer}
                    onChange={onChangeHandler}
                  />
                </Box>
              </Box>
            </Box>

            <Box className="px-4 py-5 bg-white sm:p-3">
              <Box className="col-span-6 sm:col-span-3">
                <InputLabel variant={"dark"} required={true}>
                  Status
                </InputLabel>
                <Status
                  name="status"
                  value={inventory.status}
                  onChange={onChangeHandler}
                />
              </Box>
            </Box>

            <Footer
              to={"/dashboard/faqs"}
              onClick={submitInventory}
              text={"Add"}
            />
          </Box>
        </FormGroup>
      </Box.Section>
      '
    </>
  );
};

export default AddFaq;
