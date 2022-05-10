import { useEffect } from 'react';
import { Container } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import APIAccess from '../../communication/APIAccess';
import styles from "./Content.module.css";

let FederatedLogin = (props) => {
    const { username, id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      APIAccess.isLoggedIn()
      .then(x => {
          if(x.done) {
            props.loginHandler(id, username);
            navigate('/');
          } else {
             alert('Something went wrong!');
             navigate('/');
          }
      })
    });

    return (
      <Container className={styles["search-area"]}>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
}

export default FederatedLogin;