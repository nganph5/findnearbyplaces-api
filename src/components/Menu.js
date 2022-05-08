import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import logo from "../assets/logo.jpeg";
import APIAccess from "../communication/APIAccess";
import "bootstrap/dist/css/bootstrap.css";

function Menu(props) {

  let logout = () => {
    APIAccess.logout()
      .then((x) => props.customerLoggedOut())
      .catch((e) => {
      });
  };

  return (
    <Navbar expand="lg" className={styles["nav"]}>
      
      <Container className={styles["nav-bar"]} >

        <Link to="/"><img src={logo} className={styles["logo"]} alt="yelp logo" /></Link>

        <Navbar.Toggle aria-controls="basic-navbar nav" />

        <Navbar.Collapse id="basic-navbar nav">
          <Nav>
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

            {props.customer ? (
              <>
                <p className={styles["loggedin-text"]} > Signed in as {props.customer}</p>

                <Nav.Link as={Link} to="/logout" onClick={logout}>
                  <Button className={`button ${styles["nav-button"]}`}> Log Out </Button>
                </Nav.Link>
              </> ) 
            : (
              <>
                <Nav.Link as={Link} to="/register">
                  <Button className={`button ${styles["nav-button"]}`} onClick={() => console.log(window.loc)}> Register </Button>
                </Nav.Link>

                <Nav.Link as={Link} to="/login"> 
                  <Button className={`button ${styles["nav-button"]}`}> Sign In </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
