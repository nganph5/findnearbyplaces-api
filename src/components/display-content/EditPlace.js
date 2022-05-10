import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Select from 'react-select'
import styles from "./Content.module.css";
import APIAccess from '../../communication/APIAccess';
import logo from "../../assets/logo.jpeg";
import { MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';

function EditPlace() {
  const [place_id, setID] = useState('');
  const [name, setName] = useState('');
  const [category_id, setCategory] = useState('');
  const [latitude, setLat] = useState("");
  const [longitude, setLong] = useState("");  
  const [description, setDescription] = useState('');
  const [url, setURL] = useState('');

  const navigate = useNavigate();

  let customerID = localStorage.getItem("customerID");

  let categories = localStorage.getObj("categories");
  let categoryOptions = [];
  categories.forEach(category => {
    categoryOptions.push({value: category.id, label: category.id + " - " + category.name})
  })

  let onIDChanged = (e) => {
    setID(e.target.value);
  }

  let onNameChanged = (e) => {
    setName(e.target.value);
  }

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
  }

  let onURLChanged = (e) => {
    setURL(e.target.value);
  }

  let onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(place_id, name, category_id, latitude, longitude, description, customerID, url)

    if (!customerID){
      alert("Please sign in to continue!")
      navigate("/login");
    }else{
      APIAccess.editPlace(place_id, name, category_id, latitude, longitude, description, url, customerID)
      .then((x) => {
        if (x.done) {
          APIAccess.addPhoto(url, place_id, null)
          .then(x => {
            if (x.done){
              alert("Place added succesfully!");
            }else{
              alert("Cannot add to database. Please check your input.");
            }
          })
        } else {
          alert("Cannot add to database. Please check your input.");
        }
      })
      .catch(e => {
          console.log(e);
          alert('Something went wrong!');
      }); 
    }        
  }

  return (
    <Container className={styles["search-area"]}>   
      <img src={logo} className={styles["logo"]} alt="logo" />
      
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3">
          <MDBInput label="Place ID" value={place_id} onChange={onIDChanged}/>
        </Form.Group> 

        <Form.Group className="mb-3">
          <MDBInput label="Name" value={name} onChange={onNameChanged}/>
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
        
        <Form.Group className="mb-3">
          <MDBInput label="Image URL" value={url} onChange={onURLChanged}/>
        </Form.Group> 

        <Button type="submit" block="true" className={`button ${styles["button"]}`} >Edit place</Button>  
      </Form> 
    </Container>
  );
}

export default EditPlace;

