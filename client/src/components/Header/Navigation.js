import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";

function Navigation() {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <li className="logo">Resume Builder</li>
      <li>
        <Link to="/">What is Resume Builder ❓</Link>
      </li>
      {user && (
        <li>
          <Link to="/dashboard">Create Resume 📝</Link>
        </li>
      )}
    </nav>
  );
}

export default Navigation;
