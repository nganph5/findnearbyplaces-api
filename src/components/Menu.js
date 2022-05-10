import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import { logo } from "./logo-import";
import "bootstrap/dist/css/bootstrap.css";
import APIAccess from '../communication/APIAccess';


function Menu(props) {
  
  function logout(){
    APIAccess.logout()
    .then(x => {
      props.logoutHandler();
    })
  }

  return (
    <Navbar expand="lg" className={styles["nav"]}>      
      <Link to="/"><img src={logo} className={styles["logo"]} alt="yelp logo" /></Link>
      <Navbar.Toggle aria-controls="basic-navbar nav" />

      <Navbar.Collapse id="basic-navbar nav">
        <Nav>
          <Nav.Link as={Link} to="/search">
            <Button className={`button ${styles["nav-button"]}`}> Search for places </Button>
          </Nav.Link>

          <Nav.Link as={Link} to="/allplaces">
            <Button className={`button ${styles["nav-button"]}`}> View all places </Button>
          </Nav.Link>

          {props.customerID && props.customerEmail ? (
            <>
              <Nav.Link as={Link} to="/yourplaces">
                <Button className={`button ${styles["nav-button"]}`}> Your Places </Button>
              </Nav.Link>

              <Nav.Link as={Link} to="/yourreviews">
                <Button className={`button ${styles["nav-button"]}`}> Your Reviews </Button>
              </Nav.Link>

              <Nav.Link as={Link} to="/addplace">
                <Button className={`button ${styles["nav-button"]}`}> Add a place </Button>
              </Nav.Link>

              <Nav.Link as={Link} to="/editplace">
                  <Button className={`button ${styles["nav-button"]}`}> Edit a place </Button>
              </Nav.Link>

              <Nav.Link as={Link} to="/deleteplace">
                  <Button className={`button ${styles["nav-button"]}`}> Delete a place </Button>
              </Nav.Link>

              <Nav.Link as={Link} to="/addreview">
                  <Button className={`button ${styles["nav-button"]}`}> Add a review </Button>
              </Nav.Link>

              <Nav.Link>
                <Button onClick={logout} className={`button ${styles["nav-button"]}`}> Log Out </Button>
              </Nav.Link>
            </> ) 
          : (
            <>
              <Nav.Link as={Link} to="/register">
                <Button className={`button ${styles["nav-button"]}`}> Register </Button>
              </Nav.Link>

              <Nav.Link as={Link} to="/login"> 
                <Button className={`button ${styles["nav-button"]}`}> Sign In </Button>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
