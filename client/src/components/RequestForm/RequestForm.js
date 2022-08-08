import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Field, Formik, Form } from "formik";
import {
  Button,
  InputGroup,
  Form as BootstrapForm,
  Container,
} from "react-bootstrap";
import * as Yup from "yup";
import styles from "./RequestForm.module.css";
import { toast } from "react-toastify";
import { createReqAction } from "../../actions/Request.action";

const RequestForm = ({ data, createReqAction, user }) => {
  const [submitting, setSubmitting] = useState(false);
  const [doc, setDoc] = useState(null);

  const navigate = useNavigate();

  const onSubmitHandeler = async (values) => {
    if (user === null) {
      toast.error("Please login to continue");
      return;
    }
    setSubmitting(true);
    // TODO ::: create account action
    let check = await createReqAction(values, data.id, doc);
    if (check === true) {
      toast.success("Booking Request Successful");
      setSubmitting(false);
      navigate("/dashboard");
    }
    setSubmitting(false);
  };

  const handleUpload = (e) => {
    // check file size less than 5MB
    if (e.target.files[0].size > 5000000) {
      toast.error("Document size is too large");
      setDoc(null);
      return;
    }
    setDoc(e.target.files[0]);
  };

  let initVals = {
    name: user && user.first_name ? `${user.first_name} ${user.last_name}` : "",
    phone: user && user.phone ? `${user.phone}` : "",
    occupation: "",
    job_title: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    phone: Yup.string().required("Phone number is required!"),
    occupation: Yup.string().required("Occupation is required!"),
    job_title: Yup.string().notRequired(),
  });

  return (
    <div>
      <Container fluid className="pb-4">
        <h1 className=" fw-bold">
          Request <br />
          This Listing
        </h1>

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
                    <label htmlFor="name" className="d-block">
                      Name
                    </label>
                    {errors.name && touched.name ? (
                      <small className="text-danger pt-2">{errors.name}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type your full name..."
                    name="name"
                    isValid={!errors.name && touched.name}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.name && touched.name}
                  />
                </InputGroup>

                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="phone" className="d-block">
                      Phone Number
                    </label>
                    {errors.phone && touched.phone ? (
                      <small className="text-danger pt-2">{errors.phone}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type your phone number..."
                    name="phone"
                    isValid={!errors.phone && touched.phone}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.phone && touched.phone}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="occupation" className="d-block">
                      Occupation
                    </label>
                    {errors.occupation && touched.occupation ? (
                      <small className="text-danger pt-2">
                        {errors.occupation}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type your occupation..."
                    name="occupation"
                    isValid={!errors.occupation && touched.occupation}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.occupation && touched.occupation}
                  />
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="job_title" className="d-block">
                      Job Title
                    </label>
                    {errors.job_title && touched.job_title ? (
                      <small className="text-danger pt-2">
                        {errors.job_title}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type your job title..."
                    name="job_title"
                    isValid={!errors.job_title && touched.job_title}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.job_title && touched.job_title}
                  />
                </InputGroup>

                <BootstrapForm.Group
                  controlId="formFile"
                  className="mb-3 d-flex flex-column"
                >
                  <BootstrapForm.Label>
                    Document (University ID, Passport, NID etc.)
                  </BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="file"
                    className={`${styles.input} w-100`}
                    onChange={handleUpload}
                  />
                  <small className="pt-2">
                    Document size must be less than 5MB
                  </small>
                </BootstrapForm.Group>

                <div className="pt-3 d-flex align-items-center justify-content-between">
                  <Button
                    type="submit"
                    className={"btn_primary"}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Request Now"}
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
        <span className="d-block text-center pt-5">
          By requesting this package, you agree to our:
        </span>
        <div className="d-flex justify-content-center align-items-center pt-2 pb-5">
          <Link to="/terms" className={styles.link__page}>
            Terms of conditions
          </Link>
          <div className={styles.bar}></div>
          <Link to="/privacy" className={`${styles.link__page} ms-3`}>
            Privacy policy
          </Link>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { createReqAction })(RequestForm);
