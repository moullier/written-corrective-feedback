import React, { Component } from "react";
// import "../../App.css";
import Axios from "axios";
import $ from "jquery";

class Assignment extends Component {
  constructor(props) {
    super(props);

    if(this.props.location.state) {
      console.log("there is data passed through props");
      console.log(this.props.location);
    } else {
      console.log("no data passed through props");
    }
    // check if this exists -- if not do database calls in componentDidMount to get the info
    console.log(this.props.location.state);

    if(this.props.location.state) {
      this.state = {
        uid: this.props.location.state.uid,
        classId: this.props.location.state.classId,
        classTitle: this.props.location.state.classTitle,
        assignmentId: this.props.location.state.assignmentId,
        assignmentTitle: this.props.location.state.assignmentTitle,
        assignmentDescription: ""
      }
    } else {
      this.state = {
        uid: null,
        classId: null,
        classTitle: null,
        assignmentId: null,
        assignmentTitle: null,
        assignmentDescription: ""        
      }
    }


    this.componentDidMount = this.componentDidMount.bind(this);
    this.goToTool = this.goToTool.bind(this);
  }


  componentDidMount () {
    Axios.get("/api/assignment/" + this.state.assignmentId)
    .then(data => {

      console.log("GOT HERE");
      if(data.data.Tool1 && data.data.Tool1.completed) {
        console.log("tool 1 finished");
        $("#tool1status").text("Tool Completed");
      } else if(data.data.Tool1) {
        $("#tool1status").text("In Progress");
      } else {
        console.log("tool 1 not created yet");
        $("#tool1status").text("Not Started");
      }

      if(data.data.Tool2) {
        console.log(data.data);
        $("#tool1status").text("In Progress");
      } else {
        console.log("tool 2 not created yet");
        $("#tool2status").text("Not Started");
      }


      this.setState({assignmentDescription: data.data.description})
    })
  }

  goToTool () {
    this.props.history.push({
      pathname: '/tool1',
      state: { 
        uid: this.state.uid,
        classId: this.state.classId,
        classTitle: this.state.classTitle,
        assignmentId: this.state.assignmentId,
        assignmentTitle: this.state.assignmentTitle
       }
     });
    window.location.reload();
  }


  render() {
    return (
        <div className="container">
          <h1>{this.state.assignmentTitle}</h1>
          <h3>{this.state.classTitle}</h3>
          <p>{this.state.assignmentDescription}</p>
          <div className="row">
            <div className="col-4">
              <button className="btn btn-primary btn-lg" onClick={this.goToTool}>Worksheet 1</button>
              <br />
              <span id="tool1status"></span><i className="far fa-check-circle"/>
            </div>
            <div className="col-4">
              <button className="btn btn-primary btn-lg">Worksheet 2</button>
              <br />
              <span id="tool2status">Not Started</span><i className="far fa-circle"/>
            </div>
            <div className="col-4">
              <button className="btn btn-primary btn-lg">Worksheet 3</button>
              <br />
              <span id="tool3status">Not Started</span><i className="far fa-circle"/>
            </div>
          </div>
        </div>
    )
  }

}
  
export default Assignment;