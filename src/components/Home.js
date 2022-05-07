import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import logo from "../assets/logo.jpeg";
import "./Home.css";
import { SearchBar } from "./SearchBar/SearchBar";
function Home() {
  return (
    <div className="landing">
      <div className="search-area">
        <img src={logo} className="logo" alt="logo" />
        <SearchBar />
      </div>
    </div>
  );
}

export default Home;
