import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentTable() {
  const [getTable, setGetTable] = useState([]);
  const [getSingleData, setGetSingleData] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [studentForm, setStudentForm] = useState("add")
  const [loading, setLoading] = useState(false);
  const [studetntId, setStudentID] = useState()

  const navigate = useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteClose = () => {
    setShowDelete(false)
  };
  const handleDeleteShow = () => setShowDelete(true);

  const getStudent = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/studentDetails/student`)
      .then((res) => setGetTable(res))
      .catch((err) => console.log(err));
  };

  const getStudentSingle = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/studentDetails/student/${id}`)
      .then((res) => setGetSingleData(res))
      .catch((err) => console.log(err));
  };


  
  

  console.log(studetntId, "studentID")



  const loginSchema = Yup.object().shape({
    name: Yup.string().required("Studnt Name is required"),
    class: Yup.string().required("Student Class is required"),
  });

  const initialValues = {
    name: '',
    class: '',
  };

  const editInitialValues = {
    name: getSingleData?.data?.studentDetails?.name,
    class: getSingleData?.data?.studentDetails?.class,
  };

  console.log(studentForm, "studentform")

 
  const onSubmit = (values) => {
   
    setLoading(true);
    console.log(values, "values")
    axios
      .post(studentForm === "add" ? `${process.env.REACT_APP_BACKEND_URL}/studentDetails/student/add` : `${process.env.REACT_APP_BACKEND_URL}/studentDetails/student/${getSingleData?.data?.studentDetails?._id}`, values)
      .then((res) => {
        console.log(res, "res");
    
            if (res?.data?.status === true) {

                
                toast.success(res?.data?.message)
                handleClose()
                getStudent()

              
            }
          
        
      })
      .catch((err) => {});
  };
  const validationSchema = loginSchema;
  const formik = useFormik({
    initialValues: studentForm === "add" ? initialValues : editInitialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true
  });

  console.log(formik.values, getSingleData?.data?.studentDetails?.name, "update")

  const handleDelete = async () => {
   await axios
    .delete(`${process.env.REACT_APP_BACKEND_URL}/studentDetails/student/${studetntId}`)
    .then((res) => {
      console.log(res, "res");
  
          if (res?.data?.status === true) {

              toast.success(res?.data?.message)
              handleDeleteClose()
              getStudent()

          }
    })
    .catch((err) => {});
};
  



  useEffect(() => {
    getStudent();
  }, []);



  console.log(getTable, getSingleData, "getTable")

  return (
    <div>
      <div style={{ float: 'right', margin: "20px 0" }}>
        <button className="btn btn-primary" onClick={() => {
          setStudentForm("add"); handleShow()
        }}>Add Student form</button>
      </div>
      <div>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Student Class</th>
          <th>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
       {
        getTable?.data?.studentDetails?.map((e, index) => (
          <tr>
          <td>{index + 1}</td>
          <td>{e?.name}</td>
          <td>{e?.class}</td>
          <td className="alignItem">
            <button className="btn btn-success" onClick={() => {
              setStudentForm("edit"); handleShow(); getStudentSingle(e?._id)
            } }>Edit</button>
            <button className="btn btn-danger" onClick={() => {
              handleDeleteShow();
              setStudentID(e?._id)
            }}>Delete</button>
          </td>
        </tr>
        ))
       }
        
      </tbody>
    </Table>
      </div>

 
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{studentForm === 'add' ? 'Add' : 'Edit'} Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card style={{ width: '28rem' }}>
          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Enter Student Name"
                />
                <p className="formikError">{formik.errors.name}</p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Student Class</Form.Label>
                <Form.Control
                  name="class"
                  value={formik.values.class}
                  onChange={formik.handleChange}
                  placeholder="Enter student class"
                />
                <p className="formikError">{formik.errors.class}</p>
              </Form.Group>

              <Button style={{ width: '100%' }} variant="primary" type="submit">
                {studentForm === 'add' ? 'Add' : 'Edit'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>

    <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => 
            handleDelete()
          }>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
 

    </div>
  );
}

export default StudentTable;
