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
import styles from "./ResetPasswordForm.module.css";
import { passwordResetAction } from "../../actions/Auth.action";
import { toast } from "react-toastify";

const ResetPasswordForm = ({ isAuthenticated, token, passwordResetAction }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
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
    let check = await passwordResetAction(values, token);
    if (check === true) {
      toast.success("Password Reset Successful");
      setSubmitting(false);
      navigate("/login");
    }
    setSubmitting(false);
  };
  let initVals = {
    password: "",
    password2: "",
  };

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required!")

      .min(6, "Password is too short!"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match!")
      .required("Retype Password is required!"),
  });
  return (
    <Container className="py-md-5 py-4">
      <h1 className="text-center fw-bold">
        Change Your <br />
        Account Password
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

              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="password2" className="d-block">
                    Re-type Password
                  </label>
                  {errors.password2 && touched.password2 ? (
                    <small className="text-danger">{errors.password2}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Re-type to confirm password"
                  name="password2"
                  isValid={!errors.password2 && touched.password2}
                  type={isPasswordVisible2 ? "text" : "password"}
                  className={`${styles.input} w-100 icon-hidden`}
                  isInvalid={errors.password2 && touched.password2}
                  style={{ position: "relative" }}
                />
                {!isPasswordVisible2 ? (
                  <AiOutlineEye
                    className={styles.eyeIcon}
                    onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className={styles.eyeIcon}
                    onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                  />
                )}
              </InputGroup>

              <div className="pt-3 d-flex justify-content-between align-items-center">
                <Button
                  type="submit"
                  className={"btn_primary"}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Change Password"}
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

export default connect(mapStateToProps, { passwordResetAction })(
  ResetPasswordForm
);
