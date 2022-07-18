import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Field, Formik, Form } from "formik";
import { Button, InputGroup, Container } from "react-bootstrap";
import * as Yup from "yup";
import styles from "./ReportForm.module.css";
import { toast } from "react-toastify";
import { createReportAction } from "../../actions/Report.action";

const ReportForm = ({ data, createReportAction, user }) => {
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const onSubmitHandeler = async (values) => {
    if (user === null) {
      toast.error("Please login to report listing");
      return;
    }
    setSubmitting(true);
    // TODO ::: create account action
    let check = await createReportAction(values, data.id);
    if (check === true) {
      toast.success("Package Reported Successful");
      setSubmitting(false);
      navigate(-1);
    }
    setSubmitting(false);
  };
  let initVals = {
    message: "",
  };

  const SignupSchema = Yup.object().shape({
    message: Yup.string().required("Message is required!"),
  });
  return (
    <div>
      <Container fluid className="py-4">
        {/* <h1 className=" fw-bold">Report This Listing</h1> */}

        <div className={styles.form}>
          <Formik
            initialValues={initVals}
            validationSchema={SignupSchema}
            onSubmit={(values) => onSubmitHandeler(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="message" className="d-block fs-4">
                      Reason for Reporting
                    </label>
                    {errors.message && touched.message ? (
                      <small className="text-danger pt-2">
                        {errors.message}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as="textarea"
                    placeholder="Please brifly describe why are you reporting this listing..."
                    name="message"
                    type="text"
                    className={`${styles.input} form-control w-100`}
                    rows={10}
                  />
                </InputGroup>

                <div className="pt-3 d-flex align-items-center justify-content-between">
                  <Button
                    type="submit"
                    className={"btn_primary"}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Report Now"}
                  </Button>
                  <Button
                    className={"btn_primary ms-2"}
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { createReportAction })(ReportForm);
