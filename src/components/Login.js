import Form from "react-bootstrap/Form";
import { Container, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIAccess from "../communication/APIAccess";
import styles from "./Home.module.css";
import {
  MDBInput,
  MDBBtn
} from "mdb-react-ui-kit";
import logo from "../assets/logo.jpeg";
import congifuration from "../configuration";


function Login(props) {
  let google = `${congifuration.backendAddress}/auth/google`;

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
  
            <MDBBtn type="submit" className={`button ${styles["facebook"]}`}>
              <img src="https://img.icons8.com/fluency/30/000000/facebook-new.png" alt="facebook"
              className={styles["login_logo"]}/>
              Continue With Facebook
            </MDBBtn>

            <MDBBtn
              href={google} type="submit" className={`button ${styles["google"]}`}>
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google"
              className={styles["login_logo"]} />
              Continue With Google
            </MDBBtn>

            <p>---------- Or -----------</p>

            <Form onSubmit={onSubmitHandler}>
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
              type="submit" block className={`button ${styles["button"]}`} >
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
