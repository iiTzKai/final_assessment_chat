import React, { useRef, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { auth } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState();
  const [passwd, setPasswd] = useState();
  const [confirmPasswd, setConfirmPasswd] = useState();

  const handleRegister = () => {
    if (passwd !== confirmPasswd) {
      toast.info("Password Dont Match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPasswd("");
      setConfirmPasswd("");
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, passwd)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User Created " + user.email, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setEmail("");
          setPasswd("");
          setConfirmPasswd("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          toast.error(errorMessage, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          throw error;
        });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="formContainer">
        <Form className="loginForm">
          <div className="loginformHeader">
            <h3>Register</h3>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwd">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPasswd(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmpasswd">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setConfirmPasswd(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" onClick={handleRegister}>
            Register
          </Button>
          <Link to="/" className="btnLinkRouter">
            Login
          </Link>
        </Form>
      </div>
    </>
  );
}

export default Register;
