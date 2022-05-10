import { Container, Col, Row, Card, Spinner } from "react-bootstrap";
import styles from "./Home.module.css";
import APIAccess from '../communication/APIAccess';
import noImg from "../assets/no-img.png";
import { useState, useEffect } from "react";


function UserReview() {
  let customerID = localStorage.getItem("customerID");
  const [reviews, setReviews] = useState(localStorage.getObj("reviews"));

  useEffect(x => {
    APIAccess.getReviews(customerID)
    .then(x => {
        if(x.done) {
          setReviews(x.result);
          localStorage.setObj("reviews", x.result)
        } else {
          alert("Cannot retrieve reviews due to some error.");
        }
      })
      .catch((e) => {
        alert("Cannot retrieve reviews due to some error.");
    })
  }, [])


  return(reviews && reviews.length > 0 ? 
    <Container>
      <Row md="1" className="g-4 text-center">
        {reviews.map((row) => (
          <Col key={row.id}>
            <Card>
              {row.file 
              ? <Card.Img variant="top" className={styles["place-img"]} src={row.file} alt="location" />
              : <Card.Img variant="top" className={styles["place-img"]} src={noImg} alt="location" />
              }
         
              <Card.Body>
                <Card.Title className={styles["place-name"]}>{row.name}/</Card.Title>

                <div className={styles["place-info"]}>Place ID</div>
                <div className={styles["place-detail"]}>{row.location_id}</div>

                <div className={styles["place-info"]}>Comment</div>
                <div className={styles["place-detail"]}>{row.text}</div>
                
                <div className={styles["place-info"]}>Rating</div>
                <div className={styles["place-detail"]}>{row.rating}</div>
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

export default UserReview;
