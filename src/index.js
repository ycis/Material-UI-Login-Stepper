import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./components/Nav";

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Home />
  </React.Fragment>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
