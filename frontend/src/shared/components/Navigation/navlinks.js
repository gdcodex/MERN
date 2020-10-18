import React from "react";
import { NavLink } from "react-router-dom";

import "./navlinks.css";

function Navlinks() {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>All Users</NavLink>
      </li>
      <li>
        <NavLink to="/ul/places">All Places</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">Add Place</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Auth</NavLink>
      </li>
    </ul>
  );
}

export default Navlinks;
