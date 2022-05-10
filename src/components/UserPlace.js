import { Container, Col, Row, Card, Spinner } from "react-bootstrap";
import styles from "./Home.module.css";
import APIAccess from '../communication/APIAccess';
import noImg from "../assets/no-img.png";
import { useState, useEffect } from "react";

function UserPlace() {
  let customerID = localStorage.getItem("customerID");
  const [places, setPlaces] = useState([]);

  useEffect(x => {
    APIAccess.getPlaces(customerID)
    .then(x => {
        if(x.done) {
          setPlaces(x.result);
        } else {
          alert("Cannot retrieve locations due to some error.");
        }
      })
      .catch((e) => {
        alert("Cannot retrieve locations due to some error.");
    })
  }, []);



  return(places && places.length > 0 ? 
    <Container>
      <Row md="1" className="g-4 text-center">
        {places.map((row) => (
          <Col key={row.id}>
            <Card>
              {row.file 
              ? <Card.Img variant="top" className={styles["place-img"]} src={row.file} alt="location" />
              : <Card.Img variant="top" className={styles["place-img"]} src={noImg} alt="location" />
              }
         
              <Card.Body>
                <Card.Title className={styles["place-name"]}>{row.name}</Card.Title>

                <div className={styles["place-info"]}>Place ID</div>
                <div className={styles["place-detail"]}>{row.id}</div>

                <div className={styles["place-info"]}>Location</div>
                <div className={styles["place-detail"]}>({row.latitude}, {row.longitude})</div>

                <div className={styles["place-info"]}>Description</div>
                <div className={styles["place-detail"]}>{row.description}</div>
                
                <div className={styles["place-info"]}>Category</div>
                <div className={styles["place-detail"]}>{row.category_name}</div>
                
                <div className={styles["place-info"]}>Average rating</div>
                {row.avg_rating > 0 
                ? <div className={styles["place-detail"]}>{parseFloat(row.avg_rating)}</div>
                : <div className={styles["place-detail"]}>Not yet rated</div>}
                
              </Card.Body>
            </Card>
          </Col>
        ),)}
      </Row>
    </Container>
  : <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default UserPlace;
