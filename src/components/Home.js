import { Container, Col, Row, Card } from "react-bootstrap";
import styles from "./Home.module.css";

function Home(props) {
  localStorage.removeItem("searchResult");
  let customerID = localStorage.getItem("customerID");
  let customerEmail = localStorage.getItem("customerEmail");
  let searchResult = localStorage.getObj("result");


  return (
    <Container className={styles["landing"]}>
      <Container className={styles["search-area"]}>

        {customerID && customerEmail
          ?
          <>
          {searchResult && searchResult.length > 0 ? 
            <Display result={searchResult} />
            :
            <h5 className={styles["search-result"]}> No place found yet </h5>
          }
          </>
         : (
          <>
            <h5 className={styles["welcome"]}>
              Welcome! Please sign in to continue.
            </h5>
            <img
              src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"
              alt="landing"
            />
          </>
        )}
      </Container>
    </Container>
  );
}

export const Display = ({result}) => {

  return(
    <Container>
      <Row md="1" className="g-4 text-center">
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
    </Container>
  );
}

export default Home;
