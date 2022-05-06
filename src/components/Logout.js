import { Navigate } from "react-router-dom";
import APIAccess from '../communication/APIAccess';

function LogOut(props) {
  APIAccess.logout().then(x => {
    props.customerLoggedIn("");
  })
  return (
    <Navigate to='/' />
  );
} 


export default LogOut