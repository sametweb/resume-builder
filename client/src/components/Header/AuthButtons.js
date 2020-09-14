import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../App";

function AuthButtons() {
  const { user, signIn, signOut } = useContext(AuthContext);
  const { push } = useHistory();

  const Button = () =>
    !user?.email ? (
      <button onClick={signIn} id="login">
        Login with Google
      </button>
    ) : (
      <>
        <button onClick={() => signOut(push)} id="logout">
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
