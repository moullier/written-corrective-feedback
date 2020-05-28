import React, { Component } from "react";
import "../../App.css";
import Axios from "axios";
import $ from "jquery";

class Assignment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <h1>Assignment Homepage</h1>
          <p>Blurb about assignment</p>
          <button className="btn btn-primary btn-lg mx-1">Tool 1</button>
          <button className="btn btn-primary btn-lg mx-1">Tool 2</button>
          <button className="btn btn-primary btn-lg mx-1">Tool 3</button>
        </div>
    )
  }

}
  
export default Assignment;