import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import styles from "./Home.module.css";


export function SearchBar(props) {
  const [term, setTerm] = useState(props.term || "");
  const [location, setLocation] = useState(props.location || "");

  function onSubmitHandler(e) {
    if (typeof props.search === "function") {
      props.search(term, location);
    }
    console.log(term, location);
    e.preventDefault();
  }

  let onTermChanged = (e) => {
    setTerm(e.target.value);
  }
  let onLocChanged = (e) => {
    setLocation(e.target.value);
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Search Term</Form.Label>
        <Form.Control placeholder="burgers, barbers, spas..." value={term} onChange={onTermChanged}/>
      </Form.Group>
        
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control placeholder="where to search from?" value={location} onChange={onLocChanged}/>
      </Form.Group>   
      
      <Button type="submit" className={`button ${styles["button"]}`} >Search</Button>  
    </Form> 
  );
}
