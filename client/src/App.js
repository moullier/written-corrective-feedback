import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import FTU from "./pages/FTU/FTU";
import Dashboard from "./pages/Dashboard/Dashboard";
import Class from "./pages/Class/Class";
import Assignment from "./pages/Assignment/Assignment";
import Tool1 from "./pages/Tool1/Tool1";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={"/signup"} component={Signup} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/FTU"} component={FTU} />
          <Route exact path={"/Dashboard"} component={Dashboard} />
          <Route exact path={"/Class"} component={Class} />
          <Route exact path={"/Assignment"} component={Assignment} />
          <Route exact path={"/Tool1"} component={Tool1} />
          <Route exact path={'/'} component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
