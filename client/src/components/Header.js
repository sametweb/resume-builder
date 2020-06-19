import React, { useContext } from "react";

import { AuthContext } from "../App";
import AuthButton from "./Header/LoginButton";

function Header() {
  const { user, signIn, signOut } = useContext(AuthContext);

  return (
    <div>
      <AuthButton />
    </div>
  );
}

export default Header;
