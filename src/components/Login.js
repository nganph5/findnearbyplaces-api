import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
<<<<<<< HEAD
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
=======
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIAccess from '../communication/APIAccess';
import styles from "./Home.module.css";
import logo from "../assets/logo.jpeg";

>>>>>>> de7720508d7f570b143ecb0921c473fed76ed0b9

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
<<<<<<< HEAD
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
=======
    })
    .catch(e => {
        console.log(e);
        alert('Something went wrong!');
    });         
  }

  

  return(
    <Container className={styles["landing"]}>
      <Container className={styles["search-area"]}>
        
        <img src={logo} className={styles["logo"]} alt="logo" />

        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={onEmailChanged}/>
          </Form.Group>
            
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={onPassChanged}/>
          </Form.Group>   
            
          <Button type="submit" className={`button ${styles["button"]}`} >Log In</Button>  
        </Form> 
      </Container>
    </Container>
>>>>>>> de7720508d7f570b143ecb0921c473fed76ed0b9
  );
}

export default Login;
