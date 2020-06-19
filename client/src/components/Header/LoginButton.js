import React, { useContext } from "react";

import { AuthContext } from "../../App";

function AuthButton() {
  const { user, signIn, signOut } = useContext(AuthContext);

  return !user?.email ? (
    <button onClick={signIn}>Login</button>
  ) : (
    <button onClick={signOut}>Logout</button>
  );
}

export default AuthButton;
