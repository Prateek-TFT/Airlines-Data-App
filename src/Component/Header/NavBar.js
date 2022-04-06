import React from "react";
import "./NavBar.css";
import planeImage from "../../Assets/plane.png";
const NavBar = () => {
  return (
    <header id="header">
      <p>Airlines-data</p>
      <img src={planeImage} alt="plane.jpg" />
    </header>
  );
};
export default React.memo(NavBar);
