import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import Select from 'react-select'
import styles from "./Home.module.css";
import APIAccess from '../communication/APIAccess';
import logo from "../assets/logo.jpeg";
import star from "../assets/star.png";
import { MDBInput } from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';

function AddReview() {
  const [place_id, setID] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const navigate = useNavigate();


  let customerID = localStorage.getItem("customerID");

  let starIcon = <img src={star} className={styles["star"]} alt="star" />;
  let ratingIcons = []
  for (let i = 0; i < 5; i++) {
    let newDiv = [];
    for (let j = 0; j <= i; j++) {
      newDiv.push(starIcon);
    }
    ratingIcons.push(newDiv)
  }
  
  let ratingOptions = [
    { value: '1', label: ratingIcons[0] },
    { value: '2', label: ratingIcons[1] },
    { value: '3', label: ratingIcons[2] },
    { value: '4', label: ratingIcons[3] },
    { value: '5', label: ratingIcons[4] }
  ];


  let onIDChanged = (e) => {
    setID(e.target.value);
  }

  let onCommentChanged = (e) => {
    setComment(e.target.value);
  }

  let onRatingChanged = (e) => {
    setRating(e ? e.value : '');
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
            alert('Review added successfully!');
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

          <Select placeholder="Rating"
            className={styles["options"]} 
            value={ratingOptions.find(item => item.value === rating)}
            onChange={onRatingChanged} 
            options={ratingOptions}
          />
          
          <Form.Group className="mb-3">
            <MDBInput label="Comment"
             value={comment} 
             className={styles["long-input"]} 
             onChange={onCommentChanged}/>
          </Form.Group> 

          <Button type="submit" block="true" className={`button ${styles["button"]}`} >Add a review</Button>  
        </Form> 
        </Container>
    </Container>
  );
}

export default AddReview;

