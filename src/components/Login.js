import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIAccess from "../communication/APIAccess";
import styles from "./Home.module.css";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
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
          props.loginHandler(x.user.id, x.user.username);
          navigate("/");
        } else {
          alert("The credentials are not valid!");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong!");
      });
  };

  return (
    <Container className={styles["landing"]}>
      <Container className={styles["search-area"]}>
        <img src={logo} className={styles["logo"]} alt="logo" />

        <MDBBtn type="submit" block className={`button ${styles["facebook"]}`}>
          <img
            src="https://img.icons8.com/fluency/30/000000/facebook-new.png"
            alt="facebook"
            className={styles["login_logo"]}
          />
          Continue With Facebook
        </MDBBtn>

        <MDBBtn
          href={google}
          type="submit"
          block
          className={`button ${styles["google"]}`}
        >
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="google"
            className={styles["login_logo"]}
          />
          Continue With Google
        </MDBBtn>

        <div className={styles["or-div"]}>---------- Or -----------</div>

        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <MDBInput
              label="Email address"
              type="email"
              value={email}
              onChange={onEmailChanged}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <MDBInput
              label="Password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={onPassChanged}
            />
          </Form.Group>

          <Button type="submit" className={`button ${styles["button"]}`}>
            {" "}
            Sign in{" "}
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default Login;
