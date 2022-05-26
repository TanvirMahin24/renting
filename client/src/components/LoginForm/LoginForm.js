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
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./LoginForm.module.css";
import { loginAction } from "../../actions/Auth.action";

const LoginForm = ({ isAuthenticated, loginAction }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // navigate("/discover");
    }
  }, [isAuthenticated]);

  const onSubmitHandeler = async (values) => {
    setSubmitting(true);
    // TODO ::: create account action
    let check = await loginAction(values);
    if (check) {
      console.log("SubmittEd");
    }
    setSubmitting(false);
  };
  let initVals = {
    email: "",
    password: "",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email!")

      .required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")

      .min(6, "Password is too short!"),
  });
  return (
    <Container className="py-md-5 py-4">
      <h1 className="text-center fw-bold">
        Login Into <br />
        Your Account
      </h1>
      <span className="d-block text-center pt-2 pb-4">
        Login now and start searching for your next rental home. It's free!
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

              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="password" className="d-block">
                    Password
                  </label>
                  {errors.password && touched.password ? (
                    <small className="text-danger">{errors.password}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Create your own password"
                  name="password"
                  isValid={!errors.password && touched.password}
                  type={isPasswordVisible ? "text" : "password"}
                  className={`${styles.input} w-100 icon-hidden`}
                  isInvalid={errors.password && touched.password}
                  style={{ position: "relative" }}
                />
                {!isPasswordVisible ? (
                  <AiOutlineEye
                    className={styles.eyeIcon}
                    color="black"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className={styles.eyeIcon}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                )}
              </InputGroup>

              <span className="d-block text-end">
                Don't have an account?{" "}
                <Link to="/register" className={styles.link__page}>
                  Register Now
                </Link>
              </span>

              <div className="pt-3">
                <Button
                  type="submit"
                  className={"btn_primary"}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Login"}
                </Button>
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

export default connect(mapStateToProps, { loginAction })(LoginForm);
