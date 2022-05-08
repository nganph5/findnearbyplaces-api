import { Container, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIAccess from '../communication/APIAccess';
import styles from "./Home.module.css";
import logo from "../assets/logo.jpeg";
import { MDBInput } from "mdb-react-ui-kit";


function Register() {
    const [email, setEmail] = useState('');
    const [passwd, setPass] = useState('');
    const navigate = useNavigate();

    let onEmailChanged = (e) => {
      setEmail(e.target.value);
    }

    let onPassChanged = (e) => {
      setPass(e.target.value);
    }

    function onSubmitHandler() {
      APIAccess.addCustomer(email, passwd)
      .then(x => {
        console.log(x.done)
        if (x.done){
          alert("Registration succeeded. Welcome!");
          navigate("/login");
        }else{
          alert("The email exists. Please log in.");
        }
      })
      .catch(e => {
        alert("Registration failed due to some error.");
      })
    }

    return(
      <Container className={styles["landing"]}>
        <Container className={styles["search-area"]}>
          
          <img src={logo} className={styles["logo"]} alt="logo" />

          <Form onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <MDBInput label="Email address" type="email" value={email} onChange={onEmailChanged}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <MDBInput label="Password" type="password" value={passwd} onChange={onPassChanged}/>
              </Form.Group>
              
              <Button type="submit" block="true" className={`button ${styles["button"]}`} >Create New Account</Button>  
            </Form>
          </Container>
      </Container>
    );
}

export default Register;