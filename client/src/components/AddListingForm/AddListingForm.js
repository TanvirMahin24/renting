import React, { useEffect, useState } from "react";
import styles from "./AddListingForm.module.css";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Field, Formik, Form } from "formik";
import {
  Button,
  InputGroup,
  Form as BootstrapForm,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import * as Yup from "yup";
import { updateUserAction } from "../../actions/Auth.action";
import { MultiSelect, Select, Switch } from "@mantine/core";
import { getCategoryAction } from "../../actions/Category.action";

const AddListingForm = ({
  updateUserAction,
  user,
  edit,
  data,
  category,
  getCategoryAction,
}) => {
  const [subletCheck, setSubletCheck] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (category === null) {
      getCategoryAction();
    }
  }, []);
  const onSubmitHandeler = async (values) => {
    setSubmitting(true);
    // TODO ::: create account action
    let check = await updateUserAction(values);
    if (check === true) {
      toast.success("Listing added Successfully");
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  let initVals = {
    title: edit && data.title ? data.title : "",
    category: edit && data.category ? data.category : "",
    keywords: edit && data.keywords ? data.keywords : "",
    requirements: edit && data.requirements ? data.requirements : "",
    description: edit && data.description ? data.description : "",
    size: edit && data.size ? data.size : 0,
    price: edit && data.price ? data.price : 0,
    sublet: edit && data.sublet ? data.sublet : false,

    // ROOMS
    bedrooms: edit && data.bedrooms ? data.bedrooms : 0,
    bathrooms: edit && data.bathrooms ? data.bathrooms : 0,
    dining: edit && data.dining ? data.dining : 0,
    kitchen: edit && data.kitchen ? data.kitchen : 0,
    drawingroom: edit && data.drawingroom ? data.drawingroom : 0,

    // ADDRESS
    full_address: edit && data.full_address ? data.full_address : "",
    district: edit && data.district ? data.district : "",
    house_no: edit && data.house_no ? data.house_no : "",
    floor_no: edit && data.floor_no ? data.floor_no : "",
  };

  const SignupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    category: Yup.string().required("Category is required!"),
    keywords: Yup.array().of(Yup.string()).required("Keywords are required!"),
    requirements: Yup.array().of(Yup.string()).notRequired(),
    description: Yup.string().required("Description is required!"),
    size: Yup.number()
      .min(1, "Can not be negetive")
      .required("Size is required!"),
    price: Yup.number()
      .min(800, "Minimum rent is 800 Tk")
      .required("Price is required!"),
    sublet: Yup.boolean().required(),
    // ROOMS
    bedrooms: Yup.number().when("sublet", (sublet, schema) => {
      return sublet
        ? schema
            .min(0, "Can not be negetive")
            .required("Bedroom count is required!")
        : schema.notRequired();
    }),
    bathrooms: Yup.number().when("sublet", (sublet, schema) => {
      return sublet
        ? schema
            .min(0, "Can not be negetive")
            .required("Bathroom count is required!")
        : schema.notRequired();
    }),
    dining: Yup.number().when("sublet", (sublet, schema) => {
      return sublet
        ? schema
            .min(0, "Can not be negetive")
            .required("Dining count is required!")
        : schema.notRequired();
    }),
    kitchen: Yup.number().when("sublet", (sublet, schema) => {
      return sublet
        ? schema
            .min(0, "Can not be negetive")
            .required("Kitchen count is required!")
        : schema.notRequired();
    }),
    drawingroom: Yup.number().when("sublet", (sublet, schema) => {
      return sublet
        ? schema
            .min(0, "Can not be negetive")
            .required("Drawingroom count is required!")
        : schema.notRequired();
    }),

    // ADDRESS
    full_address: Yup.string().required("Address is required!"),
    district: Yup.string().required("District is required!"),
    house_no: Yup.number().required("House no is required!"),
    floor_no: Yup.number().notRequired(),
  });
  return (
    <Container className="">
      <h2 className="border_left mt-3">Basic Information</h2>
      <div className={styles.form}>
        <Formik
          initialValues={initVals}
          validationSchema={SignupSchema}
          enableReinitialize
          onSubmit={(values) => onSubmitHandeler(values)}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center pb-2">
                  <label htmlFor="title" className="d-block">
                    Title
                  </label>
                  {errors.title && touched.title ? (
                    <small className="text-danger pt-2">{errors.title}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Type title of the listing..."
                  name="title"
                  isValid={!errors.title && touched.title}
                  type="text"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.title && touched.title}
                />
              </InputGroup>
              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center pb-2">
                  <label htmlFor="description" className="d-block">
                    Description
                  </label>
                  {errors.description && touched.description ? (
                    <small className="text-danger pt-2">
                      {errors.description}
                    </small>
                  ) : null}
                </div>
                <Field
                  as={"textarea"}
                  placeholder="Type description..."
                  name="description"
                  isValid={!errors.description && touched.description}
                  type="text"
                  className={`${styles.input} form-control w-100`}
                  style={{ height: "150px" }}
                  isInvalid={errors.description && touched.description}
                />
              </InputGroup>
              <Row>
                <Col md={6}>
                  <MultiSelect
                    label="Keywords"
                    data={[]}
                    placeholder="Type keywords..."
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) =>
                      setFieldValue("keywords", [...values.keywords, query])
                    }
                    classNames={{
                      defaultVariant: styles.select_wrapper,
                      input: styles.select,
                      dropdown: styles.dropdown,
                      searchInput: styles.searchInput,
                      label: styles.label,
                    }}
                    icon={<></>}
                  />
                </Col>
                <Col md={6}>
                  <MultiSelect
                    label="Requirements"
                    data={[]}
                    placeholder="Type requirements..."
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) =>
                      setFieldValue("requirements", [
                        ...values.requirements,
                        query,
                      ])
                    }
                    classNames={{
                      defaultVariant: styles.select_wrapper,
                      input: styles.select,
                      dropdown: styles.dropdown,
                      searchInput: styles.searchInput,
                      label: styles.label,
                    }}
                    icon={<></>}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="pt-3">
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="size" className="d-block">
                        Size (sqft)
                      </label>
                      {errors.size && touched.size ? (
                        <small className="text-danger pt-2">
                          {errors.size}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type size in square feet..."
                      name="size"
                      isValid={!errors.size && touched.size}
                      type="number"
                      min="1"
                      className={`${styles.input}  w-100`}
                      isInvalid={errors.size && touched.size}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} className="pt-3">
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="price" className="d-block">
                        Rent in Tk
                      </label>
                      {errors.price && touched.price ? (
                        <small className="text-danger pt-2">
                          {errors.price}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type rent..."
                      name="price"
                      isValid={!errors.price && touched.price}
                      type="number"
                      min="800"
                      className={`${styles.input}  w-100`}
                      isInvalid={errors.price && touched.price}
                    />
                  </InputGroup>
                </Col>
                <Col md={12} className="pt-3">
                  <h2 className="mb-3 border_left">House Information</h2>
                  <div className="d-flex justify-content-start align-items-center pt-3">
                    <span className="d-block me-3 fw-bold">Sublet</span>
                    <Switch
                      checked={values.sublet}
                      onChange={(event) => {
                        setFieldValue("sublet", event.currentTarget.checked);
                        setSubletCheck(event.currentTarget.checked);
                      }}
                    />
                  </div>
                  <hr />
                </Col>
              </Row>

              <Row>
                <Col md={6} className="pt-3">
                  <Select
                    classNames={{
                      input: `${styles.select} ${styles.input} form-control`,
                      label: styles.label,
                      selected: styles.selected,
                      dropdown: styles.dropdown2,
                    }}
                    defaultValue={values.category}
                    onChange={(value) => setFieldValue("category", value)}
                    data={
                      category !== null
                        ? category.map((item) => ({
                            label: item.name,
                            value: item.id,
                          }))
                        : []
                    }
                    error={
                      errors.category && touched.category
                        ? errors.category
                        : null
                    }
                    placeholder="Select the house type..."
                    label="Category"
                    variant="filled"
                    radius="xs"
                    size="md"
                    shadow={"lg"}
                  />
                </Col>
                <Col md={6} className="pt-3">
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="bedrooms" className="d-block">
                        No. of Bedroom
                      </label>
                      {errors.bedrooms && touched.bedrooms ? (
                        <small className="text-danger pt-2">
                          {errors.bedrooms}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type number of bedrooms..."
                      name="bedrooms"
                      isValid={!errors.bedrooms && touched.bedrooms}
                      type="number"
                      className={`${styles.input}  w-100`}
                      isInvalid={errors.bedrooms && touched.bedrooms}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} className="pt-3">
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="bathrooms" className="d-block">
                        No. of Bathrooms
                      </label>
                      {errors.bathrooms && touched.bathrooms ? (
                        <small className="text-danger pt-2">
                          {errors.bathrooms}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type number of bathrooms..."
                      name="bathrooms"
                      isValid={!errors.bathrooms && touched.bathrooms}
                      type="number"
                      className={`${styles.input}  w-100`}
                      isInvalid={errors.bathrooms && touched.bathrooms}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} className="pt-3">
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="kitchen" className="d-block">
                        No. of kitchen
                      </label>
                      {errors.kitchen && touched.kitchen ? (
                        <small className="text-danger pt-2">
                          {errors.kitchen}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type number of kitchen..."
                      name="kitchen"
                      isValid={!errors.kitchen && touched.kitchen}
                      type="number"
                      className={`${styles.input}  w-100`}
                      isInvalid={errors.kitchen && touched.kitchen}
                    />
                  </InputGroup>
                </Col>

                {subletCheck === false ? (
                  <>
                    <Col md={6} className="pt-3">
                      <InputGroup className="mb-3 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center pb-2">
                          <label htmlFor="dining" className="d-block">
                            No. of Dining Space
                          </label>
                          {errors.dining && touched.dining ? (
                            <small className="text-danger pt-2">
                              {errors.dining}
                            </small>
                          ) : null}
                        </div>
                        <Field
                          as={BootstrapForm.Control}
                          placeholder="Type number of dining..."
                          name="dining"
                          isValid={!errors.dining && touched.dining}
                          type="number"
                          className={`${styles.input}  w-100`}
                          isInvalid={errors.dining && touched.dining}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6} className="pt-3">
                      <InputGroup className="mb-3 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center pb-2">
                          <label htmlFor="drawingroom" className="d-block">
                            No. of Drawing Room
                          </label>
                          {errors.drawingroom && touched.drawingroom ? (
                            <small className="text-danger pt-2">
                              {errors.drawingroom}
                            </small>
                          ) : null}
                        </div>
                        <Field
                          as={BootstrapForm.Control}
                          placeholder="Type number of drawingroom..."
                          name="drawingroom"
                          isValid={!errors.drawingroom && touched.drawingroom}
                          type="number"
                          className={`${styles.input}  w-100`}
                          isInvalid={errors.drawingroom && touched.drawingroom}
                        />
                      </InputGroup>
                    </Col>
                  </>
                ) : (
                  <></>
                )}
              </Row>

              <Row>
                <Col md={12} className="pt-4">
                  <h2 className="mb-3 border_left">Address Information</h2>
                  <hr />
                </Col>
                <Col md={12} className="pt-3">
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="full_address" className="d-block">
                        Full Address
                      </label>
                      {errors.full_address && touched.full_address ? (
                        <small className="text-danger pt-2">
                          {errors.full_address}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type full address..."
                      name="full_address"
                      isValid={!errors.full_address && touched.full_address}
                      type="text"
                      className={`${styles.input}  w-100`}
                      isInvalid={errors.full_address && touched.full_address}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} className="pt-3">
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="district" className="d-block">
                        District
                      </label>
                      {errors.district && touched.district ? (
                        <small className="text-danger pt-2">
                          {errors.district}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type district..."
                      name="district"
                      isValid={!errors.district && touched.district}
                      type="text"
                      className={`${styles.input}  w-100`}
                      isInvalid={errors.district && touched.district}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} className="pt-3">
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="house_no" className="d-block">
                        House Number
                      </label>
                      {errors.house_no && touched.house_no ? (
                        <small className="text-danger pt-2">
                          {errors.house_no}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type house number..."
                      name="house_no"
                      isValid={!errors.house_no && touched.house_no}
                      type="text"
                      className={`${styles.input}  w-100`}
                      isInvalid={errors.house_no && touched.house_no}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} className="pt-3">
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="flat_no" className="d-block">
                        Flat Number
                      </label>
                      {errors.flat_no && touched.flat_no ? (
                        <small className="text-danger pt-2">
                          {errors.flat_no}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type flat number..."
                      name="flat_no"
                      isValid={!errors.flat_no && touched.flat_no}
                      type="text"
                      className={`${styles.input}  w-100`}
                      isInvalid={errors.flat_no && touched.flat_no}
                    />
                  </InputGroup>
                </Col>
                <Col md={6} className="pt-3">
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="floor_no" className="d-block">
                        Floor Number
                      </label>
                      {errors.floor_no && touched.floor_no ? (
                        <small className="text-danger pt-2">
                          {errors.floor_no}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Type floor number..."
                      name="floor_no"
                      isValid={!errors.floor_no && touched.floor_no}
                      type="text"
                      className={`${styles.input}  w-100`}
                      isInvalid={errors.floor_no && touched.floor_no}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <div className="pt-3">
                <Button
                  type="submit"
                  className={"btn_primary"}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Save"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  category: state.category.categories,
});

export default connect(mapStateToProps, {
  updateUserAction,
  getCategoryAction,
})(AddListingForm);
