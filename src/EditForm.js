import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  id: Yup.number().required("ID Number is required *"),
  firstName: Yup.string().required("First Name is required *"),
  lastName: Yup.string().required("Last Name is required *"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required *"),
  message: Yup.string().required("Message is required *"),
});

const EditForm = ({ data, onSubmitSuccess, onEdit }) => {
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/formData/${values.id}`,
        values
      );
      console.log("Form data updated:", response.data);
      onSubmitSuccess(); // Close the modal
      onEdit(); // Fetch updated data
      actions.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            name="id"
            type="number"
            className="form-control mb-2"
            disabled
          />
          <ErrorMessage name="id" component="div" className="text-danger" />

          <Field name="firstName" type="text" className="form-control mb-2" />
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-danger"
          />

          <Field name="lastName" type="text" className="form-control mb-2" />
          <ErrorMessage
            name="lastName"
            component="div"
            className="text-danger"
          />

          <Field name="email" type="email" className="form-control mb-2" />
          <ErrorMessage name="email" component="div" className="text-danger" />

          <Field
            name="message"
            as="textarea"
            className="form-control mb-2"
            rows="4"
          />
          <ErrorMessage
            name="message"
            component="div"
            className="text-danger"
          />

          <Button
            style={{
              backgroundColor: "rgb(181, 110, 220)",
              borderColor: "rgb(128, 0, 128)",
            }}
            type="submit"
            className="mt-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditForm;
