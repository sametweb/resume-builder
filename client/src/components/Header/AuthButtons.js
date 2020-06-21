import React, { useContext } from "react";

import { AuthContext } from "../../App";

function AuthButtons() {
  const { user, signIn, signOut } = useContext(AuthContext);

  const Button = () =>
    !user?.email ? (
      <button onClick={signIn} id="login">
        Login with Google
      </button>
    ) : (
      <>
        <button onClick={signOut} id="logout">
          Logout <img src={user?.photoURL} alt="user avatar" />
        </button>
      </>
    );

  return (
    <div className="buttons">
      <Button />
    </div>
  );
}

export default AuthButtons;
