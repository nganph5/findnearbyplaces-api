import { HashRouter, Routes, Route } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import FederatedLogin from "./components/FederatedLogin";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import AddPlace from "./components/AddPlace";
import Display from "./components/Display";
import EditPlace from "./components/EditPlace";
import DeletePlace from "./components/DeletePlace";
import AddReview from "./components/AddReview";
import { useState } from "react";


function App() {
  const [customer, setCustomer] = useState(localStorage.getItem("customer"));

  let customerLoggedInHandler = (customerEmail) => {
    localStorage.setItem("customer", customerEmail);
    setCustomer(customerEmail);
  };

  let customerLoggedOutHandler = () => {
    localStorage.removeItem("customer");
    setCustomer(undefined);
  };

  return (
    <HashRouter>
      <Container fluid>
        <Row>
          <Col>
            <Menu customer={customer} customerLoggedOut={customerLoggedOutHandler}/>
          </Col>
        </Row>
        <Routes>
          <Route exact path="/login" element={<Login customerLoggedIn={customerLoggedInHandler} />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/google/:username" element={<FederatedLogin provider="google" customerLoggedIn={customerLoggedInHandler}/>}></Route>
          <Route exact path="/logout" element={<Logout customerLoggedIn={customerLoggedInHandler} />}></Route>
          <Route exact path="/addplace" element={<AddPlace />}></Route>
          <Route exact path="/editplace" element={<EditPlace />}></Route>
          <Route exact path="/deleteplace" element={<DeletePlace />}></Route>
          <Route exact path="/addreview" element={<AddReview />}></Route>
          <Route exact path="/display" element={<Display />}></Route>

          <Route exact path="/" element={<Home />}></Route>
        </Routes>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </HashRouter>
  );
}

export default App;
