import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./navlinks.css";

function Navlinks(props) {
  const authC = useContext(AuthContext);
  const [user, setuser] = useState(null);

  useEffect(() => {
    setuser(authC.loadedUsers.filter((u) => u.id === authC.userId));
  }, [authC]);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" onClick={props.onClick} exact>
          Users
        </NavLink>
      </li>

      {authC.isLoggedIn && (
        <li>
          <NavLink to="/places/new" onClick={props.onClick}>
            Share
          </NavLink>
        </li>
      )}
      {authC.isLoggedIn && user && user[0] && (
        <li id="user-li">
          <Link to={`/${authC.userId}/places`} onClick={props.onClick}>
            <img
              id="user-image-account"
              src={`http://localhost:5000/${user[0].image}`}
              alt="My places"
            />
          </Link>
        </li>
      )}
      {authC.isLoggedIn && (
        <li>
          <Link to="/auth" onClick={authC.logout}>
            <img src="/logout.png" alt="logout" />
          </Link>
        </li>
      )}

      {!authC.isLoggedIn && (
        <li>
          <NavLink to="/auth" onClick={props.onClick}>
            <img src="/auth.png" alt="Auth" />
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default Navlinks;
