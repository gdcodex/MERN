import React from "react";
import { NavLink } from "react-router-dom";

import "./navlinks.css";

function Navlinks(props) {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" onClick={props.onClick} exact>
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/ul/places" onClick={props.onClick}>
          All Places
        </NavLink>
      </li>
      <li>
        <NavLink to="/places/new" onClick={props.onClick}>
          Add Place
        </NavLink>
      </li>
      <li>
        <NavLink to="/auth" onClick={props.onClick}>
          Auth
        </NavLink>
      </li>
    </ul>
  );
}

export default Navlinks;
