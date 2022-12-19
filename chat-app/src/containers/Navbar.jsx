import React, { useContext } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import "../styles.css";
import "../buttons.css";

const NavBar = () => {
  const { userLogged } = useContext(AuthContext);
  let navigate = useNavigate();
  const toLogin = () => {
    let path = `/login`;
    navigate(path);
  };
  return (
    <nav className="nav-bar">
      <div className="navbar-wrapper">
        <span className="logo-nav">I T U C H A T</span>
        <Button
          text={userLogged.displayName}
          icon={<LogoutSharpIcon />}
          className="fixed-btn secondary-white small with-icon"
          onClick={() => {
            signOut(auth);
            toLogin();
          }}
        ></Button>
      </div>
    </nav>
  );
};

export default NavBar;