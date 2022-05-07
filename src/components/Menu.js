import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import logo from "../assets/logo.jpeg";
import { SearchBar } from "./SearchBar/SearchBar";
import congifuration from "../configuration";
import APIAccess from "../communication/APIAccess";
import "bootstrap/dist/css/bootstrap.css";

function Menu(props) {
  let google = `${congifuration.backendAddress}/auth/google`;

  let logout = () => {
    APIAccess.logout()
      .then((x) => props.customerLoggedOut())
      .catch((e) => {
      });
  };

  return (
    <Navbar expand="lg" style={{ marginBottom: "40px", background: "#5FA5A6"}}>
      <Container>
        <div className={styles["nav-bar"]}>
          <Link to="/">
            <img src={logo} className={styles.logo} alt="yelp logo" />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar nav" />
          <Navbar.Collapse id="basic-navbar nav">
            <Nav className="me-auto">
              {props.customer ? (
                <Navbar.Text>
                  Signed in as {props.customer}
                  <Nav.Link as={Link} to="/logout" onClick={logout}>
                    Log Out
                  </Nav.Link>
                </Navbar.Text>
              ) : (
                <>
                  <Nav.Link as={Link} to="/register">
                    {" "}
                    <button className={`button ${styles["nav-button"]}`}>
                      Register
                    </button>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/login">
                    <button className={`button ${styles["nav-button"]}`}>
                      Sign In
                    </button>
                  </Nav.Link>
                  <Nav.Link href={google}>
                    <button className={`button ${styles["nav-button"]}`}>
                      Sign In With Google
                    </button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default Menu;
