import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { auth, signIn, signOut } from "./firebase";
import "./style.scss";

import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import EditResume from "./components/Dashboard/EditResume";

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
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      <Router>
        <Header />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/dashboard/edit/:id" component={EditResume} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
