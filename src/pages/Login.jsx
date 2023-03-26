import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { auth, provider } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [passwd, setPasswd] = useState();
  const navigate = useNavigate();

  const googleProvider = async () => {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then((result) => {
        const credintial = GoogleAuthProvider.credentialFromResult(result);
        const token = credintial.accessToken;
        const user = result.user;
        navigate('/chatroom');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credintial = googleProvider.credentialFromError(error);
      });
  };

  const HandleLogin = async () => {
    signInWithEmailAndPassword(auth, email, passwd)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/chatroom");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="formContainer">
        <Form className="loginForm">
          <div className="loginformHeader">
            <h3>Login</h3>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPasswd(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={HandleLogin}>
            Login
          </Button>
          <p className="or">
            <h5>or</h5>
          </p>
          <Button className="loginWithGoogle" onClick={googleProvider}>
            Continue with Google
          </Button>
          <Link to="/register" className="btnLinkRouter">
            Register
          </Link>
        </Form>
      </div>
    </>
  );
}

export default Login;
