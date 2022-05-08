import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./Home.module.css";
import APIAccess from '../communication/APIAccess';
import logo from "../assets/logo.jpeg";

function EditPlace() {
  const [place_id, setID] = useState('');
  const [name, setName] = useState('');
  const [category_id, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  let onIDChanged = (e) => {
    setID(e.target.value);
  }

  let onNameChanged = (e) => {
    setName(e.target.value);
  }

  let onCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  let onLocationChanged = (e) => {
    setLocation(e.target.value);
  }

  let onDescriptionChanged = (e) => {
    setDescription(e.target.value);
  }

  let onSubmitHandler = (e) => {
    e.preventDefault();
    let latitude = location.split(",")[0];
    let longitude = location.split(",")[1];

    APIAccess.editPlace(place_id, name, category_id, latitude, longitude, description)
    .then(x => {
        if(x.done) {
          alert('Place edited succesfully!');
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

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={onNameChanged}/>
          </Form.Group> 

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control value={location} onChange={onLocationChanged}/>
          </Form.Group> 

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control value={category_id} onChange={onCategoryChange}/>
          </Form.Group> 

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control value={description} onChange={onDescriptionChanged}/>
          </Form.Group> 
          
          <Button type="submit" block className={`button ${styles["button"]}`} >Edit place</Button>  
        </Form> 
        </Container>
    </Container>
  );
}

export default EditPlace;

