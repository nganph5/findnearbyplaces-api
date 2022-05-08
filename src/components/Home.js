import logo from "../assets/logo.jpeg";
import styles from "./Home.module.css";
import { Container } from "react-bootstrap";
import { SearchBar } from "./SearchBar";


function Home() {
  return (
    <Container className={styles["landing"]}>
      <Container className={styles["search-area"]}>
        <img src={logo} className={styles["logo"]} alt="logo" />
        <SearchBar />
      </Container>
    </Container>
  );
}

export default Home;
