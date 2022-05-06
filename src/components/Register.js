import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIAccess from '../communication/APIAccess';


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
          navigate("/login");
        }else{
          alert(x.message);
        }
      })
      .catch(e => {
        alert("Registration failed.");
      })
    }

    return(
      <Container>
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" value={email} onChange={onEmailChanged}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" value={passwd} onChange={onPassChanged}/>
            </Form.Group>
            <Button type="submit">Submit</Button>  
        </Form>
      </Container>
    );
}

export default Register;