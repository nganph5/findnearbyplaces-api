import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import APIAccess from '../communication/APIAccess';


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
      <>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
}

export default FederatedLogin;