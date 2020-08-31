import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        assignmentDescription: "",
        selectedCorrectionTypes: [],
        successfulLoad: false
      }
    } else {
      this.state = {
        uid: null,
        classId: null,
        classTitle: null,
        assignmentId: null,
        assignmentTitle: null,
        assignmentDescription: "",
        selectedCorrectionTypes: [],
        successfulLoad: false
      }
    }


    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.goToTool1 = this.goToTool1.bind(this);
    this.goToTool2 = this.goToTool2.bind(this);
    this.updateToolStatus = this.updateToolStatus.bind(this);
  }


  componentDidMount () {
    Axios.get("/api/assignment/" + this.state.assignmentId)
    .then(data => {

      let assignedDay, dueDay, returnDay, expectationsDay, responseDueDay, responseReturnDay, peerWCFDay;
      let dueDayObj, assignedDayObj, returnDayObj, expectationsDayObj, responseDueDayObj, responseReturnDayObj, peerWCFDayObj;
      let tool1status = 0;

      if(Boolean(data.data.Tool1)) {
        console.log(data.data.Tool1);
        const tool1 = data.data.Tool1;
        const tool1ID = tool1.id;
        console.log("tool1ID = " + tool1ID);

        tool1status = (tool1.completed === true) ? 2 : 1;

        // all dates retrieved
        assignedDay = tool1.dateAssigned;
        dueDay = tool1.dueDate;
        returnDay = tool1.returnDate;
        expectationsDay = tool1.expectationsDate;
        responseDueDay = tool1.responseDueDate;
        responseReturnDay = tool1.responseReturnDate;
        peerWCFDay = tool1.peerWCFDate;

        // check if date returned from database is null
        if(assignedDay) {
          assignedDayObj = new Date(assignedDay);
          console.log(assignedDayObj);
        }
        
        if(dueDay) {
          dueDayObj = new Date(dueDay);
          console.log(dueDayObj);
        }

        if(returnDay) {
          returnDayObj = new Date(returnDay);
          console.log(returnDayObj);
        }

        if(expectationsDay) {
          expectationsDayObj = new Date(expectationsDay);
          console.log(expectationsDayObj);
        }

        if(responseDueDay) {
          responseDueDayObj = new Date(responseDueDay);
          console.log(responseDueDayObj);
        }
        
        if(responseReturnDay) {
          responseReturnDayObj = new Date(responseReturnDay);
          console.log(responseReturnDayObj);
        }

        if(peerWCFDay) {
          peerWCFDayObj = new Date(peerWCFDay);
          console.log(peerWCFDayObj);
        }
        Axios.get("/api/correction_types/" + tool1ID)
        .then((ct_res) => {
          console.log(ct_res.data);
          
          // format correction types as an array of strings
          const correction_types = ct_res.data.map(el => el.category);
          console.log(correction_types);

          this.setState({
            assignmentDescription: data.data.description,
            tool1exists: Boolean(data.data.Tool1),
            assignedDay: assignedDayObj,
            dueDay: dueDayObj,
            returnDay: returnDayObj,
            expectationsDay: expectationsDayObj,
            responseDueDay: responseDueDayObj,
            responseReturnDay: responseReturnDayObj,
            peerWCFDay: peerWCFDayObj,
            selectedCorrectionTypes: correction_types,
            successfulLoad: true,
            tool1status: tool1status
          })
        });


      }
    })
  }

  componentDidUpdate() {
    this.updateToolStatus();
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

  updateToolStatus() {
          // update Tool1 status
          if(this.state.tool1status === 2) {
            console.log("tool 1 finished");
            $("#tool1status").text("Tool Completed");
            $("#tool1check").removeClass("fa-circle");
            $("#tool1check").addClass("fa-check-circle");
          } else if(this.state.tool1status === 1) {
            $("#tool1status").text("In Progress");
          } else {
            console.log("tool 1 not created yet");
            $("#tool1status").text("Not Started");
          }
    
          // if(data.data.Tool2) {
          //   console.log(data.data);
          //   $("#tool2status").text("In Progress");
          // } else {
          //   console.log("tool 2 not created yet");
          //   $("#tool2status").text("Not Started");
          // }
  }


  render() {

    if(!this.state.successfulLoad) {
      return(
      <div className="container d-flex justify-content-center">
        <div className="spinner-border m-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      );
    }

    // render div to display correction types based on the number that have been selected (3-6)
    let correctionTypesDiv = "";
    let columnWidth = (this.state.selectedCorrectionTypes.length > 0) ? Math.floor(12 / this.state.selectedCorrectionTypes.length) : 0;

    
    columnWidth = "selectedTypeCol border col-" + columnWidth;

    if(this.state.tool1exists && this.state.selectedCorrectionTypes.length > 0) {
      correctionTypesDiv = <div className="mt-5">
        <p><strong>Selected Correction Types:</strong></p>
        <div className="row justify-content-center">
        {this.state.selectedCorrectionTypes.map((el, index) => (
          <div key={index} className={columnWidth}>{el}</div>
        ))}
      </div>
      </div>
    }

    const assignmentFlowchart = this.state.tool1exists ? <div className="mt-5">
      <p><strong>Assignment Flowchart:</strong></p>
        <div className="d-flex justify-content-center container-fluid">
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
                {this.state.assignedDay &&
                `${this.state.assignedDay.toLocaleDateString()}`}
              </td>
            </tr>
            <tr className="d-flex">
              <th scope="row" className="col-6">Setting Student Expectations of WCF</th>
              <td className="col-6">
                {this.state.expectationsDay &&
                `${this.state.expectationsDay.toLocaleDateString()}`}
              </td>
            </tr>
            <tr className="d-flex">
              <th scope="row" className="col-6">Peer WCF Activities (optional)</th>
              <td className="col-6">
                {this.state.peerWCFDay &&
                `${this.state.peerWCFDay.toLocaleDateString()}`}
              </td>
            </tr>
            <tr className="d-flex">
              <th scope="row" className="col-6">Assignment Deadline</th>
              <td className="col-6">
              {this.state.dueDay &&
              `${this.state.dueDay.toLocaleDateString()}`}
              </td>
            </tr>
            <tr className="d-flex">
              <th scope="row" className="col-6">Assignment Returned to Students</th>
              <td className="col-6">
                {this.state.returnDay &&
                `${this.state.returnDay.toLocaleDateString()}`}
              </td>
            </tr>
            <tr className="d-flex">
              <th scope="row" className="col-6">Students Complete Revised Text or Alternative Response to WCF</th>
              <td className="col-6">
                {this.state.responseDueDay &&
                `${this.state.responseDueDay.toLocaleDateString()}`}
              </td>
            </tr>
            <tr className="d-flex">
              <th scope="row" className="col-6">Return Revised Text or Alternative Assignment</th>
              <td className="col-6">
                {this.state.responseReturnDay &&
                `${this.state.responseReturnDay.toLocaleDateString()}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> : "";

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
          {correctionTypesDiv}
          {assignmentFlowchart}
          <Link className="mt-3" to={{
              pathname: '/class',
              state: {
                uid: this.state.uid,
                classId: this.state.classId
              }
          }}>Back to Class Homepage</Link>
        </div>
    )
  }

}
  
export default Assignment;