import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIAccess from '../communication/APIAccess';
import styles from "./Home.module.css";
import logo from "../assets/logo.jpeg";


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

    let onSubmitHandler = (e) =>{
      APIAccess.addCustomer(email, passwd)
      .then(x => {
        if (x.done){
          alert("Registration succeeded. Welcome!");
          navigate("/login");
        }else{
          alert("The email exists. Please log in.");
        }
      })
      .catch(e => {
        alert("Registration failed.");
      })
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
                <Form.Control type="password" placeholder="Enter Password" value={passwd} onChange={onPassChanged}/>
              </Form.Group>
              
              <Button type="submit" block className={`button ${styles["button"]}`} >Create New Account</Button>  
            </Form>
          </Container>
      </Container>
    );
}

export default Register;