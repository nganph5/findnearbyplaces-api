import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import styles from "./Content.module.css";
import APIAccess from '../../communication/APIAccess';
import logo from "../../assets/logo.jpeg";
import { MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';


function DeletePlace() {
  const [place_id, setID] = useState('');
  const navigate = useNavigate();

  let customerID = localStorage.getItem("customerID");

  let onIDChanged = (e) => {
    setID(e.target.value);
  }

  let onSubmitHandler = (e) => {
    e.preventDefault();
    if (!customerID){
      alert("Please sign in to continue!")
      navigate("/login");
    }else{
      APIAccess.deletePlace(place_id, customerID)
      .then(x => {
          if(x.done) {
            alert('Place deleted succesfully!');
          } else {
            alert('Cannot delete place. Make sure to only delete places that you upload.');
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
        
        <Button type="submit" block="true" className={`button ${styles["button"]}`} >Delete</Button>  
      </Form> 
    </Container>
  );
}

export default DeletePlace;

