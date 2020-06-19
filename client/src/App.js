import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { auth, signIn, signOut } from "./firebase";

export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        setUser({ displayName, email, photoURL });
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      <Router>
        <Header />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
