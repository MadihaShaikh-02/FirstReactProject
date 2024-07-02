import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Container, Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  id: Yup.number().required("ID Number is required *"),
  firstName: Yup.string().required("First Name is required *"),
  lastName: Yup.string().required("Last Name is required *"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required *"),
  message: Yup.string().required("Message is required *"),
});

const MyForm = ({ onSubmitSuccess }) => {
  const initialValues = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/formData`,
        values
      );
      console.log("Form data saved:", response.data);
      onSubmitSuccess(); // Callback to handle success
      actions.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <Container>
      <h1 className="text-center mb-4"> Form</h1>
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="id"
                  type="number"
                  placeholder="ID Number"
                  className="form-control mb-2"
                />
                <ErrorMessage
                  name="id"
                  component="div"
                  className="text-danger"
                />

                <Field
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className="form-control mb-2"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />

                <Field
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="form-control mb-2"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />

                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="form-control mb-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />

                <Field
                  name="message"
                  as="textarea"
                  placeholder="Your Message"
                  className="form-control mb-2"
                  rows="4"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-danger"
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default MyForm;
