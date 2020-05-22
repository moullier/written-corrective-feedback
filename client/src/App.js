import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={"/signup"} component={Signup} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={'/'} component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
