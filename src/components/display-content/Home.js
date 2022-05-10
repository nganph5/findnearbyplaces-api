import { Container, Col, Row, Card } from "react-bootstrap";
import styles from "./Content.module.css";

function Home() {
  localStorage.removeItem("searchResult");
  let customerID = localStorage.getItem("customerID");
  let customerEmail = localStorage.getItem("customerEmail");
  let searchResult = localStorage.getObj("result");


  return (
    <Container className={styles["display-area"]}>
      {customerID && customerEmail
        ?
        <>
        {searchResult && searchResult.length > 0 ? 
          <Display result={searchResult} />
          :
          <Row xs="1" sm="1" md="1" lg="1" xl="1" xxl="1" className="g-4 text-center">
            <Col><h5 className={styles["no-result-text"]}> No place found yet </h5></Col>
          </Row>
        }
        </>
        : (
        <>
          <Row xs="1" sm="1" md="1" lg="1" xl="1" xxl="1" className="g-4 text-center">
            <Col>
              <h5 className={styles["no-result-text"]}>
                Welcome! Please sign in to continue.
              </h5>
              <img className={styles["landing-img"]}
                src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"
                alt="landing"/>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export const Display = ({result}) => {

  return(
    <Row xs="1" sm="1" md="1" lg="1" xl="1" xxl="1" className="g-4 text-center">
      {result.map((row) => (
        <Col key={row.id}>
          <Card>
            <Card.Img variant="top" src={row.file} alt="location" />
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
              <div className={styles["place-detail"]}>{parseFloat(row.avg_rating)}</div>
            </Card.Body>
          </Card>
        </Col>
      ),)}
    </Row>
  );
}

export default Home;
