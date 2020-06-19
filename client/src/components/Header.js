import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../App";
import AuthButtons from "./Header/AuthButtons";
import Navigation from "./Header/Navigation";

function Header() {
  const { user, signIn, signOut } = useContext(AuthContext);

  return (
    <header>
      <div className="content">
        <Navigation />
        <AuthButtons />
      </div>
    </header>
  );
}

export default Header;
