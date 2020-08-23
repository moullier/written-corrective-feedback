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
    this.goToTool1 = this.goToTool1.bind(this);
    this.goToTool2 = this.goToTool2.bind(this);
  }


  componentDidMount () {
    Axios.get("/api/assignment/" + this.state.assignmentId)
    .then(data => {
      // update Tool1 status
      if(data.data.Tool1 && data.data.Tool1.completed) {
        console.log("tool 1 finished");
        $("#tool1status").text("Tool Completed");
        $("#tool1check").removeClass("fa-circle");
        $("#tool1check").addClass("fa-check-circle");
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


      this.setState({
        assignmentDescription: data.data.description,
        tool1exists: Boolean(data.data.Tool1)
      })
    })
  }

  goToTool1() {
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

  goToTool2() {
    this.props.history.push({
      pathname: '/tool2',
      state: { 
        uid: this.state.uid,
        classId: this.state.classId,
        classTitle: this.state.classTitle,
        assignmentId: this.state.assignmentId,
        assignmentTitle: this.state.assignmentTitle
       }
     });
    // window.location.reload();
  }


  render() {

    const assignmentFlowchart = this.state.tool1exists ? <div className="d-flex justify-content-center container-fluid mt-5">
      <table className="table tool1table">
        <thead className="thead-light">
          <tr className="d-flex">
            <th scope="col" className="col-6">Task</th>
            <th scope="col" className="col-6">Planned Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="d-flex">
            <th scope="row" className="col-6">Assignment Description Distributed to Students</th>
            <td className="col-6">
            {/* {assignedDay &&
            !isDisabled &&
            `${assignedDay.toLocaleDateString()}`} */}
            </td>
          </tr>
          <tr className="d-flex">
            <th scope="row" className="col-6">Setting Student Expectations of WCF</th>
            <td className="col-6">
            {/* {dueDay &&
            !dueDisabled &&
            `${dueDay.toLocaleDateString()}`} */}
            </td>
          </tr>
          <tr className="d-flex">
            <th scope="row" className="col-6">Peer WCF Activities (optional)</th>
            <td className="col-6">
            {/* {dueDay &&
            !dueDisabled &&
            `${dueDay.toLocaleDateString()}`} */}
            </td>
          </tr>
          <tr className="d-flex">
            <th scope="row" className="col-6">Assignment Deadline</th>
            <td className="col-6">
            {/* {dueDay &&
            !dueDisabled &&
            `${dueDay.toLocaleDateString()}`} */}
            </td>
          </tr>
          <tr className="d-flex">
            <th scope="row" className="col-6">Assignment Returned to Students</th>
            <td className="col-6">
            {/* {returnDay &&
            !returnDisabled &&
            `${returnDay.toLocaleDateString()}`} */}
            </td>
          </tr>
          <tr className="d-flex">
            <th scope="row" className="col-6">Students Complete Revised Text or Alternative Response to WCF</th>
            <td className="col-6">
            {/* {returnDay &&
            !returnDisabled &&
            `${returnDay.toLocaleDateString()}`} */}
            </td>
          </tr>
        </tbody>
      </table>
    </div> : "NO TOOL1 DATA EXISTS";

    return (
        <div className="container text-center">
          <h1>{this.state.assignmentTitle}</h1>
          <h3>{this.state.classTitle}</h3>
          <p>{this.state.assignmentDescription}</p>
          <div className="row">
            <div className="col-4 d-block justify-content-center text-center">
              <button className="btn btn-primary btn-lg" onClick={this.goToTool1}>Worksheet 1</button>
              <div className="d-block">
                <span id="tool1status"></span>
                <i id="tool1check" className="far fa-circle"/>
              </div>
            </div>
            <div className="col-4 d-block justify-content-center text-center">
              <button className="btn btn-primary btn-lg" onClick={this.goToTool2}>Worksheet 2</button>
              <div className="d-block">
                <span id="tool2status">Not Started</span>
                <i className="far fa-circle"/>
              </div>
            </div>
            <div className="col-4 d-block justify-content-center text-center">
              <button className="btn btn-primary btn-lg">Worksheet 3</button>
              <br />
              <div className="d-block">
                <span id="tool3status">Not Started</span>
                <i className="far fa-circle"/>
              </div>
            </div>
          </div>
          {assignmentFlowchart}
        </div>
    )
  }

}
  
export default Assignment;