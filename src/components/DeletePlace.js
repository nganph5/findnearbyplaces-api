import React, { useState } from "react";
import { Container, Button, Form, Col } from "react-bootstrap";
import styles from "./Home.module.css";
import APIAccess from '../communication/APIAccess';
import logo from "../assets/logo.jpeg";

function DeletePlace() {
  const [place_id, setID] = useState('');

  let onIDChanged = (e) => {
    setID(e.target.value);
  }


  let onSubmitHandler = (e) => {
    e.preventDefault();
    APIAccess.deletePlace(place_id)
    .then(x => {
        if(x.done) {
          alert('Place deleted succesfully!');
        } else {
          alert('Something went wrong!');
        }
    })
    .catch(e => {
        console.log(e);
        alert('Something went wrong!');
    });         
  }

  return (
    <Container className={styles["landing"]}>
      <Container className={styles["search-area"]}>
      
        <img src={logo} className={styles["logo"]} alt="logo" />
        
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Place ID</Form.Label>
            <Form.Control value={place_id} onChange={onIDChanged}/>
          </Form.Group> 
          
          <Button type="submit" block className={`button ${styles["button"]}`} >Delete</Button>  
        </Form> 
        </Container>
    </Container>
  );
}

export default DeletePlace;

