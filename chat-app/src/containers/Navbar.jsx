import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import "../buttons.css";

const NavBar = ({ onLoad }) => {
  let navigate = useNavigate();
  const toLogin = () => {
    let path = `/login`;
    navigate(path);
  };
  return (
    <nav className="nav-bar">
      <div className="navbarWrapper">
        <span className="logoNav">I T U C H A T</span>
        <Button
          text="Logout"
          className="fixed-btn secondary-white small"
          onClick={toLogin}
          icon={""}
        ></Button>
      </div>
    </nav>
  );
};

export default NavBar;
