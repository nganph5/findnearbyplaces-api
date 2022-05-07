import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
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
        <Navbar.Brand as={Link} to="/"  style={{ color: "white" }} >
          Search for places
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar nav" />
        <Navbar.Collapse id="basic-navbar nav">
          <Nav className="me-auto">
            {props.customer ? (
              <Navbar.Text>
                Signed in as {props.customer}
                <Nav.Link as={Link} to="/logout" onClick={logout} style={{ color: "white" }} >
                  Log Out
                </Nav.Link>
              </Navbar.Text>
            ) : (
              <>
                <Nav.Link as={Link} to="/register" style={{ color: "white" }}>
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login" style={{ color: "white" }}>
                  Login
                </Nav.Link>
                <Nav.Link href={google} style={{ color: "white" }}>Sign In with Google</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
