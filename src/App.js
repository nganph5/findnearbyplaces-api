import { HashRouter, Routes, Route } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Home from "./components/display-content/Home";
import Search from "./components/display-content/Search";
import AllPlace from "./components/display-content/AllPlace";
import UserPlace from "./components/display-content/UserPlace";
import UserReview from "./components/display-content/UserReview";
import AddPlace from "./components/display-content/AddPlace";
import EditPlace from "./components/display-content/EditPlace";
import DeletePlace from "./components/display-content/DeletePlace";
import AddReview from "./components/display-content/AddReview";
import Register from "./components/display-content/Register";
import Login from "./components/display-content/Login";
import FederatedLogin from "./components/display-content/FederatedLogin";
import { useState, useEffect } from "react";
import APIAccess from "./communication/APIAccess";
import bg from "./assets/bg.jpg";
import "./App.css"

function App() {
  const [customerID, setID] = useState(localStorage.getItem("customerID"));
  const [customerEmail, setEmail] = useState(localStorage.getItem("customerEmail"));

  Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
  }
  Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
  }

  function loginHandler(id, username) {
    localStorage.setItem("customerID", id);
    localStorage.setItem("customerEmail", username);
    setID(localStorage.getItem("customerID"));
    setEmail(localStorage.getItem("customerEmail"));
  }

  function logoutHandler() {
    localStorage.removeItem("customerID");
    localStorage.removeItem("customerEmail");
    setID(localStorage.getItem("customerID"));
    setEmail(localStorage.getItem("customerEmail"));
  }


  useEffect(() => {
    APIAccess.getCategory()
    .then(x => {
        if(x.done) {
          localStorage.setObj("categories", x.result);
        } else {
          alert("Cannot retrieve categories due to some error.");
        }
      })
      .catch((e) => {
        alert("Cannot retrieve categories due to some error.");
      })
  }, []);

  
  return (
    <HashRouter>
      <Container fluid>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Menu customerID={customerID} customerEmail={customerEmail} logoutHandler={logoutHandler}/>
          </Col>
        </Row>

        <Container fluid className="bg">
          <Routes>
            <Route exact path="/login" element={<Login loginHandler={loginHandler} />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/google/:username/:id" element={<FederatedLogin provider="google" loginHandler={loginHandler} />}></Route>
            <Route exact path="/search" element={<Search />}></Route>
            <Route exact path="/addplace" element={<AddPlace />}></Route>
            <Route exact path="/editplace" element={<EditPlace />}></Route>
            <Route exact path="/deleteplace" element={<DeletePlace />}></Route>
            <Route exact path="/addreview" element={<AddReview />}></Route>
            <Route exact path="/yourplaces" element={<UserPlace />}></Route>
            <Route exact path="/yourreviews" element={<UserReview />}></Route>
            <Route exact path="/allplaces" element={<AllPlace />}></Route>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
        </Container>

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
