import React from "react";

import AuthButtons from "./Header/AuthButtons";
import Navigation from "./Header/Navigation";

function Header() {
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
