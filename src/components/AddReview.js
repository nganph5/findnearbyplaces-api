import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import styles from "./Home.module.css";
import APIAccess from '../communication/APIAccess';
import logo from "../assets/logo.jpeg";
import { MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';

function AddReview() {
  const [place_id, setID] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const navigate = useNavigate();

  let customerID = localStorage.getItem("customerID");

  let onIDChanged = (e) => {
    setID(e.target.value);
  }

  let onCommentChanged = (e) => {
    setComment(e.target.value);
  }

  let onRatingChanged = (e) => {
    setRating(e.target.value);
  }

  let onSubmitHandler = (e) => {
    e.preventDefault();
    if (!customerID){
      alert("Please sign in to continue!")
      navigate("/login");
    }else{
      APIAccess.addReview(place_id, comment, rating, customerID)
      .then(x => {
          if(x.done) {
            alert('Review added succesfully!');
          } else {
            alert('Cannot add review. Please check your input.');
          }
      })
      .catch(e => {
          console.log(e);
          alert('Something went wrong!');
      });  
    }       
  }

  return (
    <Container className={styles["landing"]}>
      <Container className={styles["search-area"]}>
      
        <img src={logo} className={styles["logo"]} alt="logo" />
        
        <Form onSubmit={onSubmitHandler}>
          
          <Form.Group className="mb-3">
            <MDBInput label="Place ID" value={place_id} onChange={onIDChanged}/>
          </Form.Group> 

          <Form.Group className="mb-3">
            <MDBInput label="Comment" value={comment} onChange={onCommentChanged}/>
          </Form.Group> 

          <Form.Group className="mb-3">
            <MDBInput label="Rating" value={rating} onChange={onRatingChanged}/>
          </Form.Group> 
          
          <Button type="submit" block className={`button ${styles["button"]}`} >Add a review</Button>  
        </Form> 
        </Container>
    </Container>
  );
}

export default AddReview;

