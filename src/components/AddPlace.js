import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import styles from "./Home.module.css";
import APIAccess from "../communication/APIAccess";
import logo from "../assets/logo.jpeg";
import { MDBInput } from "mdb-react-ui-kit";

function AddPlace() {
  const [name, setName] = useState("");
  const [category_id, setCategory] = useState("");
  const [latitude, setLat] = useState("");
  const [longitude, setLong] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  let customerID = localStorage.getItem("customerID");


  let categories = localStorage.getObj("categories");
  let categoryOptions = [];
  categories.forEach(category => {
    categoryOptions.push({value: category.id, label: category.id + " - " + category.name})
  })


  let onNameChanged = (e) => {
    setName(e.target.value);
  };

  let onCategoryChanged = (e) => {
    setCategory(e ? e.value : '');
  };

  let onLatChanged = (e) => {
    setLat(e.target.value);
  };

  let onLongChanged = (e) => {
    setLong(e.target.value);
  };

  let onDescriptionChanged = (e) => {
    setDescription(e.target.value);
  };

  let onSubmitHandler = (e) => {
    e.preventDefault();
    if (!customerID) {
      alert("Please sign in to continue!");
      navigate("/login");
    } else {
      APIAccess.addPlace(
        name,
        category_id,
        latitude,
        longitude,
        description,
        customerID
      )
        .then((x) => {
          if (x.done) {
            alert("Place added succesfully!");
          } else {
            alert("Cannot add to database. Please check your input.");
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Something went wrong!");
        });
    }
  };

  return (
    <Container className={styles["landing"]}>
      <Container className={styles["search-area"]}>
        <img src={logo} className={styles["logo"]} alt="logo" />

        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">
            <MDBInput label="Name" value={name} onChange={onNameChanged} />
          </Form.Group>

          <Form.Group className="mb-3">
            <MDBInput label="Latitude" type="number" value={latitude} onChange={onLatChanged}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <MDBInput label="Longitude" type="number" value={longitude} onChange={onLongChanged}/>
          </Form.Group>

          <Select placeholder="Category"
            className={styles["options"]} 
            value={categoryOptions.find(item => item.value === category_id)}
            onChange={onCategoryChanged} 
            options={categoryOptions}
          />

          <Form.Group className="mb-3">
            <MDBInput label="Description" 
            value={description} 
            onChange={onDescriptionChanged}/>
          </Form.Group> 
          
          <Button type="submit" block="true" className={`button ${styles["button"]}`} >Add a location</Button>  
        </Form> 
        </Container>
    </Container>
  );
}

export default AddPlace;
