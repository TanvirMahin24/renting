import React, { useEffect, useState } from "react";
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
import styles from "./ForgetPassForm.module.css";
import { toast } from "react-toastify";
import { resetLinkSend } from "../../actions/Users.action";

const ForgetPassForm = ({ isAuthenticated, resetLinkSend }) => {
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const onSubmitHandeler = async (values) => {
    setSubmitting(true);
    // TODO ::: create account action
    let check = await resetLinkSend(values.email);
    if (check === true) {
      toast.success("Resent link sent to your email");
      setSubmitting(false);
    }
    setSubmitting(false);
  };
  let initVals = {
    email: "",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email!")
      .required("Email is required!"),
  });
  return (
    <Container className="py-md-5 py-4">
      <h1 className="text-center fw-bold">
        Reset Your <br />
        Password
      </h1>
      <span className="d-block text-center pt-2 pb-4">
        We will send you a link to reset your password.
      </span>
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
                  <label htmlFor="email" className="d-block">
                    Email
                  </label>
                  {errors.email && touched.email ? (
                    <small className="text-danger pt-2">{errors.email}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Type your email..."
                  name="email"
                  isValid={!errors.email && touched.email}
                  type="text"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.email && touched.email}
                />
              </InputGroup>

              <div className="pt-3 d-flex justify-content-between align-items-center">
                <Button
                  type="submit"
                  className={"btn_primary"}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Send Reset Link"}
                </Button>
                <Link
                  as={Button}
                  type="submit"
                  to="/login"
                  className={"btn_primary text-decoration-none"}
                  disabled={submitting}
                >
                  Go Back
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <span className="d-block text-center pt-5">
        By creating an account, you agree to our:
      </span>
      <div className="d-flex justify-content-center align-items-center pt-2 pb-5">
        <Link to="/terms" className={styles.link__page}>
          Terms of conditions
        </Link>
        <div className={styles.bar}></div>
        <Link to="/privacy" className={styles.link__page}>
          Privacy policy
        </Link>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { resetLinkSend })(ForgetPassForm);
