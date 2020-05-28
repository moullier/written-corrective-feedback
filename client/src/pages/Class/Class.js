import React, { Component } from "react";
import "../../App.css";
import Axios from "axios";
import $ from "jquery";

class Class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <div>List of Assignments on this Page</div>
          <button className="btn btn-primary btn-lg mx-1">Create New Assignment</button>
        </div>
    )
  }

}
  
export default Class;