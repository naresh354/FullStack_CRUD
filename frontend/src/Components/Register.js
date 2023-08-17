import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup"; // For validation

function BasicExample() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, "register")

  const onSubmit = (values) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, values)
      .then((res) => {
        console.log(res, "res");
       
            if (res?.data?.status === true) {
              toast.success(res?.data?.message)
              navigate("/");
            }
          
      })
      .catch((err) => { console.log(err, "err") });
  };
  const validationSchema = loginSchema;
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  console.log(formik.errors, "errors")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: "28rem" }}>
        <Card.Body>
          <h4 style={{ textAlign: "center" }}>Register Form</h4>
          <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                name="name"
                onChange={formik.handleChange}
                placeholder="Enter Name"
              />
              <p className="formikError">{formik.errors.name}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={formik.handleChange}
                placeholder="Enter email"
              />
              <p className="formikError">{formik.errors.email}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={formik.handleChange}
                placeholder="Password"
              />
              <p className="formikError">{formik.errors.password}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <p>Already have an account? <span style={{ cursor: "pointer", fontWeight: 700 }} onClick={() => navigate("/")}>Login</span></p>
            </Form.Group>

            <Button variant="primary" style={{ width: "100%", cursor: "pointer" }} type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BasicExample;
