import { Container, Col, Row, Card } from "react-bootstrap";
import styles from "./Home.module.css";
import bg1 from "../assets/bg1.jpg";

function Home(props) {
  let customerID = localStorage.getItem("customerID");
  let customerEmail = localStorage.getItem("customerEmail");
  let searchResult = localStorage.getObj("searchResult")

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
      <Row xs={1} md={3} className="g-4 text-center">
        {result.map((row) => (
          <Col key={row.id}>
            <Card>
              <Card.Img variant="top" src={row.file} alt="location" />
              <Card.Body>
                <Card.Title className={styles["place-name"]}>{row.name}</Card.Title>
                <Card.Text><div className={styles["place-info"]}>Place ID</div> {row.id}</Card.Text>
                <Card.Text><div className={styles["place-info"]}>Location</div>({row.latitude}, {row.longitude})</Card.Text>
                <Card.Text><div className={styles["place-info"]}>Description</div>{row.description}</Card.Text>
                <Card.Text><div className={styles["place-info"]}>Category</div>{row.category_name}</Card.Text>
                <Card.Text><div className={styles["place-info"]}>Average rating</div>{parseFloat(row.avg_rating)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ),)}
      </Row>
    </Container>
  );
}

export default Home;
