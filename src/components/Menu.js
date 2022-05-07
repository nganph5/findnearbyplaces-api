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
        console.log(e);
      });
  };

  return (
    <Navbar expand="lg" style={{ marginBottom: "40px" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar nav" />
        <Navbar.Collapse id="basic-navbar nav">
          <Nav className="me-auto">
            {props.customer ? (
              <Navbar.Text>
                Signed in as {props.customer}
                <Nav.Link
                  as={Link}
                  to="/logout"
                  onClick={logout}
                >
                  Log Out
                </Nav.Link>
              </Navbar.Text>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link href={google}>Sign In with Google</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
