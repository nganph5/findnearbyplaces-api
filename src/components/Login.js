import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import congifuration from "../configuration";
import APIAccess from "../communication/APIAccess";

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
        alert("Something went wrong!");
      });
  };
  let google = `${congifuration.backendAddress}/auth/google`;

  let logout = () => {
    APIAccess.logout()
      .then((x) => props.customerLoggedOut())
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Container>
        <form onSubmit={onSubmitHandler}>
          <MDBInput
            className="mb-4"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={onEmailChanged}
            id="form2Example1"
            label="Email address"
          />
          <MDBInput
            className="mb-4"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={onPassChanged}
            id="form2Example2"
            label="Password"
          />

          <MDBRow className="mb-4">
            <MDBCol className="d-flex justify-content-center">
              <MDBCheckbox
                id="form2Example3"
                label="Remember me"
                defaultChecked
              />
            </MDBCol>
            <MDBCol>
              <a href="#!">Forgot password?</a>
            </MDBCol>
          </MDBRow>

          <MDBBtn type="submit" className="mb-4" block>
            Sign in
          </MDBBtn>

          <div className="text-center">
            <p>
              Not a member? <Link to="/register">Register</Link>
            </p>
            <p>or sign up with:</p>

            <MDBBtn floating className="mx-1">
              <MDBIcon fab icon="google" />
            </MDBBtn>
          </div>
        </form>
      </Container>
    </>
  );
}

export default Login;
