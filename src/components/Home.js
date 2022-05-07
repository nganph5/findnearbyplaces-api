import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIAccess from '../communication/APIAccess';


function Home(props) {
  const [search_term, setSearchTerm] = useState('');
  const [user_location, setLocation] = useState('');
  const [maximum_results_to_return, setMaxRes] = useState('');
  const [radius_filter, setRadius] = useState('');
  const [category_filter, setCategory] = useState('');
  const [sort, setSort] = useState('');

  const navigate = useNavigate();

  let onSearchTermChanged = (e) => {
    setSearchTerm(e.target.value);
  }

  let onLocationChanged = (e) => {
    setLocation(e.target.value);
  }

  let onMaxResChanged = (e) => {
    setMaxRes(e.target.value);
  }

  let onRadiusChanged = (e) => {
    setRadius(e.target.value);
  }

  let onCategoryChanged = (e) => {
    setCategory(e.target.value);
  }

  let onSortChanged = (e) => {
    setSort(e.target.value);
  }

  let search = (e) => {
    e.preventDefault();
    APIAccess.search(search_term, user_location, maximum_results_to_return, radius_filter, category_filter, sort)
    .then(x => {
      if(x.done) {
          console.log(x.result);
          navigate('/');           
      } else {
          alert('Cannot search for location(s)');
      }
    })
    .catch(e => {
        alert('Something went wrong!');
    });         
  }

  return (
    <div>
      <Container fluid="md">
        <Form onSubmit={search}>
          
          <Form.Group className="mb-3">
            <Form.Label>Keyword</Form.Label>
              <Form.Control type="text" placeholder="" value={search_term} onChange={onSearchTermChanged}/>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>User location</Form.Label>
              <Form.Control type="text" placeholder="" value={user_location} onChange={onLocationChanged}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of results to return</Form.Label>
              <Form.Control type="text" placeholder="" value={maximum_results_to_return} onChange={onMaxResChanged}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Search radius</Form.Label>
              <Form.Control type="text" placeholder="" value={radius_filter} onChange={onRadiusChanged}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="" value={category_filter} onChange={onCategoryChanged}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sort mode</Form.Label>
              <Form.Control type="text" placeholder="" value={sort} onChange={onSortChanged}/>
          </Form.Group>
            
          <Button type="submit" style={{ background: "#5FA5A6", border: "None" }}>Search</Button>  
        </Form> 
      </Container>
    </div>
  );
}

export default Home;
