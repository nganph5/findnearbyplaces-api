import { Container, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from 'react-router-dom';
import APIAccess from '../communication/APIAccess';
import { MDBInput } from "mdb-react-ui-kit";
import logo from "../assets/logo.jpeg";


function Search() {
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
    <Container className={styles["landing"]}>
      <Container className={styles["search-area"]}>

        <img src={logo} className={styles["logo"]} alt="logo" />

        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">
            <MDBInput label="Search Term" value={search_term} onChange={onTermChanged}/>
          </Form.Group>
            
          <Form.Group className="mb-3">
            <MDBInput label="Location" value={user_location} onChange={onLocationChanged}/>
          </Form.Group>   

                  
          <Form.Group className="mb-3">
            <MDBInput label="Number of return results" value={maximum_results_to_return} onChange={onMaxResChanged}/>
          </Form.Group>  

                  
          <Form.Group className="mb-3">
            <MDBInput label="Radius" value={radius_filter} onChange={onRadiusChanged}/>
          </Form.Group>  

                  
          <Form.Group className="mb-3">
            <MDBInput label="Category" value={category_filter} onChange={onCategoryChanged}/>
          </Form.Group>  

                  
          <Form.Group className="mb-3">
            <MDBInput label="Sort Mode" value={sort} onChange={onSortChanged}/>
          </Form.Group>  
          
          <Button type="submit" block className={`button ${styles["button"]}`} >Search</Button>  
        </Form> 
      </Container>
    </Container>
  );
}

export default Search;