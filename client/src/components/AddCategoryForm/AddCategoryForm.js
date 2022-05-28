import React, { useState } from "react";
import styles from "./AddCategoryForm.module.css";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Field, Formik, Form } from "formik";
import { Button, InputGroup, Form as BootstrapForm } from "react-bootstrap";
import * as Yup from "yup";
import { createCategoryAction } from "../../actions/Category.action";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = ({ data, createCategoryAction, edit }) => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const onSubmitHandeler = async (values) => {
    setSubmitting(true);
    // TODO ::: create account action
    let check = await createCategoryAction(values);
    if (check === true) {
      toast.success("Category Created Successfully");
      setSubmitting(false);
      navigate("/category");
    }
    setSubmitting(false);
  };
  let initVals = {
    name: edit ? (data && data.name ? data.name : "") : "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Category name is required!"),
  });

  return (
    <div className="px-md-5 px-3">
      <h2 className="border_left mt-3">{edit ? "Edit" : "Add"} Category</h2>
      <div className={styles.form}>
        <Formik
          initialValues={initVals}
          validationSchema={SignupSchema}
          enableReinitialize
          onSubmit={(values) => onSubmitHandeler(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center pb-2">
                  <label htmlFor="name" className="d-block">
                    Category Name
                  </label>
                  {errors.name && touched.name ? (
                    <small className="text-danger pt-2">{errors.name}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Type category name..."
                  name="name"
                  isValid={!errors.name && touched.name}
                  type="text"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.name && touched.name}
                />
              </InputGroup>

              <div className="pt-3">
                <Button
                  type="submit"
                  className={"btn_primary"}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Add Category"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { createCategoryAction })(
  AddCategoryForm
);
