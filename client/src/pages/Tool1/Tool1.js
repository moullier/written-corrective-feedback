import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "./index.css"
import Axios from "axios";
import $ from "jquery";

class Tool1 extends Component {
  constructor(props) {
    super(props);

    // check if this exists -- if not do database calls in componentDidMount to get the info
    console.log(this.props.location.state);

    this.state = {
      uid: this.props.location.state.uid,
      classId: this.props.location.state.classId,
      classTitle: this.props.location.state.classTitle,
      assignmentId: this.props.location.state.assignmentId,
      assignmentTitle: this.props.location.state.assignmentTitle
    }

  }

  render() {
    return (
        <div>
          <h1>Assignment Blueprint Tool – Plan Your Assignment!</h1>
          <h2 className="mb-5">{this.state.assignmentTitle}</h2>
          <p>Use this planning tool to develop a WCF strategy and timeline for a specific assignment.</p>
          <p></p>
          <h5>Step 1: Assignment Flowchart</h5>
          <h5 className="initiallyHidden">Step 2: Determining Error Types for Focused Feedback</h5>
          <h5 className="initiallyHidden">Step 3: Determining the Directness of Feedback</h5>
          <h5 className="initiallyHidden">Step 4: Setting Student Expectations</h5>
          <h5 className="initiallyHidden">Step 5: Determine What Learners Will Have to Do In Response to Your WCF Strategy</h5>
          <h5 className="initiallyHidden">Step 6: Peer WCF (Optional) </h5>
          <Link to={{
            pathname: "/assignment",
            state: { 
              uid: this.props.location.state.uid,
              classId: this.props.location.state.classId,
              classTitle: this.props.location.state.classTitle,
              assignmentId: this.props.location.state.assignmentId,
              assignmentTitle: this.props.location.state.assignmentTitle
            }
          }}
          >Return to Assignment Hub</Link>
        </div>
    )
  }

}
  
export default Tool1;