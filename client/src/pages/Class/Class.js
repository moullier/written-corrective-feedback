import React, { Component } from "react";
import "../../App.css";
import Axios from "axios";
import $ from "jquery";

class Class extends Component {
  constructor(props) {
    super(props);

    console.log("some props");
    console.log(this.props.location.state);

    this.state = {
      uid: this.props.location.state.uid,
      classId: this.props.location.state.classId
    }
  }

  componentDidMount () {
    Axios.get("/api/assignment_list/" + this.state.classId)
    .then()
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