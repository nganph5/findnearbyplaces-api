import { Container } from "react-bootstrap";
import styles from "./Home.module.css";
import bg1 from "../assets/bg1.jpg";

function Home(props) {
  let customerID = localStorage.getItem("customerID");
  let customerEmail = localStorage.getItem("customerEmail");

  return (
    <Container className={styles["landing"]}>
      <Container className={styles["search-area"]}>
        {customerID && customerID ? (
          <>
            <h5 className={styles["welcome"]}> Hello, {customerEmail}! </h5>
            <p>Your ID is: {customerID}</p>
          </>
        ) : (
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

export default Home;
