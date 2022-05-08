import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIAccess from '../communication/APIAccess';
import styles from "./Home.module.css";
import logo from "../assets/logo.jpeg";


function Login(props) {
  const [password, setPass] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  let onEmailChanged = (e) => {
    setEmail(e.target.value);
  }

  let onPassChanged = (e) => {
    setPass(e.target.value);
  }

  let onSubmitHandler = (e) => {
    e.preventDefault();
    APIAccess.login(email, password)
    .then(x => {
        if(x.done) {
            props.customerLoggedIn(email);
            navigate('/');           
        } else {
            alert('The credentials are not valid!');
        }
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
  );
}

export default Login;
