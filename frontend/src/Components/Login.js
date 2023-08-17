import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup"; // For validation
import { toast } from "react-toastify";

function BasicExample() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = (values) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, values)
      .then((res) => {
        console.log(res, "res");
    
            if (res?.data?.status === true) {

                console.log("Hiii Two")
              toast.success(res?.data?.message)
              sessionStorage.setItem("auth-token", res.data?.token);
              navigate("/dashboard");
            }
          
        // loader false
        // setLoading(false);
      })
      .catch((err) => {});
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
          <h4 style={{ textAlign: "center" }}>Login Form</h4>
          <Form onSubmit={formik.handleSubmit}>
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
              <p>Don’t you have an account? <span style={{ cursor: "pointer", fontWeight: 700 }} onClick={() => navigate("/register")}>Sign Up</span></p>
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
