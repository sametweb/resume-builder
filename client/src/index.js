import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL || "http://localhost:5001",
  headers: {},
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
