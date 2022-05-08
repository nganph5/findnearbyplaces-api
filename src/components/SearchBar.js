import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from 'react-router-dom';
import APIAccess from '../communication/APIAccess';

export function SearchBar() {
  const [search_term, setTerm] = useState("");
  const [user_location, setLocation] = useState("");
  const [maximum_results_to_return, setMaxRes] = useState("");
  const [radius_filter, setRadius] = useState("");
  const [category_filter, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();


  let onTermChanged = (e) => {
    setTerm(e.target.value);
  }

  let onLocationChanged = (e) => {
    setLocation(e.target.value);
  }

  let onRadiusChanged = (e) => {
    setRadius(e.target.value);
  }

  let onMaxResChanged = (e) => {
    setMaxRes(e.target.value);
  }

  let onCategoryChanged = (e) => {
    setCategory(e.target.value);
  }

  let onSortChanged = (e) => {
    setSort(e.target.value);
  }

  let onSubmitHandler = (e) => {
    e.preventDefault();
    APIAccess.search(search_term, user_location, maximum_results_to_return, radius_filter, category_filter, sort)
    .then(x => {
        if(x.done) {
          navigate('/display')
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
    <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Search Term</Form.Label>
        <Form.Control value={search_term} onChange={onTermChanged}/>
      </Form.Group>
        
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control value={user_location} onChange={onLocationChanged}/>
      </Form.Group>   

              
      <Form.Group className="mb-3">
        <Form.Label>Maximum # of return results</Form.Label>
        <Form.Control value={maximum_results_to_return} onChange={onMaxResChanged}/>
      </Form.Group>  

              
      <Form.Group className="mb-3">
        <Form.Label>Radius</Form.Label>
        <Form.Control value={radius_filter} onChange={onRadiusChanged}/>
      </Form.Group>  

              
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control value={category_filter} onChange={onCategoryChanged}/>
      </Form.Group>  

              
      <Form.Group className="mb-3">
        <Form.Label>Sort Mode</Form.Label>
        <Form.Control value={sort} onChange={onSortChanged}/>
      </Form.Group>  
      
      <Button type="submit" block className={`button ${styles["button"]}`} >Search</Button>  
    </Form> 
  );
}
