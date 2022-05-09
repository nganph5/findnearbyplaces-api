import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import APIAccess from "../communication/APIAccess";
import logo from "../assets/logo.jpeg";
import { MDBInput } from "mdb-react-ui-kit";

function AddPlace() {
  const [name, setName] = useState("");
  const [category_id, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  let customerID = localStorage.getItem("customerID");

  let onNameChanged = (e) => {
    setName(e.target.value);
  };

  let onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  let onLocationChanged = (e) => {
    setLocation(e.target.value);
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
      let latitude = location.split(",")[0];
      let longitude = location.split(",")[1];

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
            <MDBInput
              label="Location (lat,long)"
              value={location}
              onChange={onLocationChanged}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <MDBInput
              label="Category"
              value={category_id}
              onChange={onCategoryChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <MDBInput
              label="Description"
              value={description}
              onChange={onDescriptionChanged}
            />
          </Form.Group>

          <Button type="submit" block className={`button ${styles["button"]}`}>
            Add a location
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default AddPlace;
