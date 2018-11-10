import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import PrivateRoute from "./utils/Auth/PrivateRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  render() {
    const Main = () => (
      <Switch>
        <Route path="/login" component={Landing} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute component={Home} />
      </Switch>
    );

    return (
      <Router>
        <Main />
      </Router>
    );
  }
}

export default App;
