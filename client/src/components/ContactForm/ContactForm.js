import React, { useState } from "react";

import { Field, Formik, Form } from "formik";
import {
  Button,
  InputGroup,
  Form as BootstrapForm,
  Row,
  Col,
} from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import styles from "./ContactForm.module.css";
import { submitContact } from "../../actions/Contact.action";
import { connect } from "react-redux";

const ContactForm = ({ submitContact }) => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmitHandeler = async (values) => {
    setSubmitting(true);
    let check = await submitContact(values);
    if (check === true) {
      toast.success("Message sent successfully");
      setSubmitting(false);
    }
    setSubmitting(false);
  };
  let initVals = {
    email: "",
    name: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required!"),
    email: Yup.string()
      .email("Enter a valid email!")

      .required("Email is required!"),
  });
  return (
    <div className="">
      <span className="d-block  pt-4 pb-4 lead">
        Drop a message and we will get back to you as soon as possible.
      </span>
      <div className={styles.form}>
        <Formik
          initialValues={initVals}
          validationSchema={SignupSchema}
          onSubmit={(values) => onSubmitHandeler(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <Row>
                <Col md={6}>
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="name" className="d-block">
                        Full Name
                      </label>
                      {errors.name && touched.name ? (
                        <small className="text-danger pt-2">
                          {errors.name}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type your name..."
                      name="name"
                      isValid={!errors.name && touched.name}
                      type="text"
                      className={`${styles.input} w-100`}
                      isInvalid={errors.name && touched.name}
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="email" className="d-block">
                        Email
                      </label>
                      {errors.email && touched.email ? (
                        <small className="text-danger pt-2">
                          {errors.email}
                        </small>
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
                </Col>
              </Row>

              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center pb-2">
                  <label htmlFor="message" className="d-block">
                    Message
                  </label>
                  {errors.message && touched.message ? (
                    <small className="text-danger pt-2">{errors.message}</small>
                  ) : null}
                </div>
                <Field
                  as="textarea"
                  placeholder="Type your message..."
                  name="message"
                  type="text"
                  rows="7"
                  className={`${styles.input} form-control w-100`}
                />
              </InputGroup>

              <div className="pt-3">
                <Button
                  type="submit"
                  className={"btn_primary"}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Send Message"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default connect(null, { submitContact })(ContactForm);
