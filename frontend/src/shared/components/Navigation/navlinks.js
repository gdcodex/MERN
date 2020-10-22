import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./navlinks.css";

function Navlinks(props) {
  const authC = useContext(AuthContext)
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" onClick={props.onClick} exact>
          All Users
        </NavLink>
      </li>
      {authC.isLoggedIn && 
      <li>
        <NavLink to="/u1/places" onClick={props.onClick}>
          All Places
        </NavLink>
      </li>
      }

      {authC.isLoggedIn && 
      <li>
        <NavLink to="/places/new" onClick={props.onClick}>
          Add Place
        </NavLink>
      </li>
      }
      {authC.isLoggedIn && 
      <li>
        <NavLink to="/auth" onClick={props.onClick, authC.logout}>
         LOGOUT
        </NavLink>
      </li>
      }
      {!authC.isLoggedIn && 
      <li>
        <NavLink to="/auth" onClick={props.onClick}>
          Auth
        </NavLink>
      </li>
      }
    </ul>
  );
}

export default Navlinks;
