import { Container, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import Select from 'react-select'
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import APIAccess from "../communication/APIAccess";
import { MDBInput } from "mdb-react-ui-kit";
import logo from "../assets/logo.jpeg";


function Search(props) {
  const [search_term, setTerm] = useState("");
  const [latitude, setLat] = useState("");
  const [longitude, setLong] = useState("");
  const [maximum_results_to_return, setMaxRes] = useState("");
  const [radius_filter, setRadius] = useState("");
  const [category_filter, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();
  
  let sortOptions = [
    { value: '0', label: '0 - Default' },
    { value: '1', label: '1 - Shortest distance' },
    { value: '2', label: '2 - Highest rating' }
  ];

  let categories = localStorage.getObj("categories");
  let categoryOptions = [];
  categories.forEach(category => {
    categoryOptions.push({value: category.name, label: category.name})
  })


  let onTermChanged = (e) => {
    setTerm(e.target.value);
  };

  let onLatChanged = (e) => {
    setLat(e.target.value);
  };

  let onLongChanged = (e) => {
    setLong(e.target.value);
  };

  let onRadiusChanged = (e) => {
    setRadius(e.target.value);
  };

  let onMaxResChanged = (e) => {
    setMaxRes(e.target.value);
  };

  let onCategoryChanged = (e) => {
    setCategory(e ? e.value : '');
  };

  let onSortChanged = (e) => {
    setSort(e ? e.value : '');
  };

  let onSubmitHandler = (e) => {
    e.preventDefault();
    let user_location = latitude + "," + longitude;
    console.log(search_term, user_location, maximum_results_to_return, radius_filter, category_filter, sort)
    APIAccess.search(search_term, user_location, maximum_results_to_return, radius_filter, category_filter, sort)
    .then(x => {
        if(x.done) {
          props.searchHandler(x.result);
          navigate('/')
        } else {
          alert('Cannot find any place. Please check your input.');
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong!");
      });
  };


  return (
    <Container className={styles["landing"]}>
      <Container className={styles["search-area"]}>
        <img src={logo} className={styles["logo"]} alt="logo" />

        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">
            <MDBInput
              label="Search Term"
              value={search_term}
              onChange={onTermChanged}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <MDBInput label="Latitude" type="number" value={latitude} onChange={onLatChanged}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <MDBInput label="Longitude" type="number" value={longitude} onChange={onLongChanged}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <MDBInput
              type="number"
              label="Number of return results"
              value={maximum_results_to_return}
              onChange={onMaxResChanged}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <MDBInput
              type="number"
              label="Radius"
              value={radius_filter}
              onChange={onRadiusChanged}
            />
          </Form.Group>

          <Select placeholder="Category"
            className={styles["options"]} 
            value={categoryOptions.find(item => item.value === category_filter)}
            onChange={onCategoryChanged} 
            options={categoryOptions}
          />

          <Select placeholder="Sort mode"
            className={styles["options"]} 
            value={sortOptions.find(item => item.value === sort)}
            onChange={onSortChanged} 
            options={sortOptions}
          />
          
          <Button type="submit" block="true" className={`button ${styles["button"]}`} >Search</Button>  
        </Form> 
      </Container>
    </Container>
  );
}

export default Search;
