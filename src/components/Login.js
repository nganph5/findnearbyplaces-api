import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIAccess from "../communication/APIAccess";
import styles from "./Home.module.css";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../assets/logo.jpeg";


function Login(props) {
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  let onEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  let onPassChanged = (e) => {
    setPass(e.target.value);
  };

  let onSubmitHandler = (e) => {
    e.preventDefault();
    APIAccess.login(email, password)
      .then((x) => {
        if (x.done) {
          props.customerLoggedIn(email);
          navigate("/");
        } else {
          alert("The credentials are not valid!");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong!");
      });
    }

    return (
      <Container className={styles["landing"]}>
        <Container className={styles["search-area"]}>
          <img src={logo} className={styles["logo"]} alt="logo" />
  
          <Form onSubmit={onSubmitHandler}>
            <MDBBtn type="submit" className="mb-4" block style={{}}>
              <img src="https://img.icons8.com/fluency/30/000000/facebook-new.png" />
              Continue With Facebook
            </MDBBtn>
            <MDBBtn
              type="submit"
              className="mb-4"
              block
              style={{ backgroundColor: "black" }}
            >
              <img src="https://img.icons8.com/doodle/30/000000/apple.png" />
              Continue With Apple
            </MDBBtn>
            ---------- Or -----------
            <MDBInput
              controlId="formBasicEmail"
              className="mb-4"
              type="email"
              id="form2Example1"
              label="Email address"
              value={email}
              onChange={onEmailChanged}
            />
            <MDBInput
              controlId="formBasicPassword"
              className="mb-4"
              type="password"
              id="form2Example2"
              label="Password"
              placeholder="Enter Password"
              value={password}
              onChange={onPassChanged}
            />
            <MDBBtn
              type="submit"
              className="mb-4"
              block
              style={{ backgroundColor: "#D32323" }}
            >
              Sign in
            </MDBBtn>
          </Form>
        </Container>
        <Col>
          <img
            src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"
            alt="ss"
          />
        </Col>
      </Container>
    );
  }

export default Login;
