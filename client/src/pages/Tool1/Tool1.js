import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "./index.css"
import Axios from "axios";
import $ from "jquery";
import Popper from 'popper.js';
import 'bootstrap/js/dist/dropdown';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import "react-day-picker/lib/style.css";

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
      assignmentTitle: this.props.location.state.assignmentTitle,
      assignedDay: undefined,
      dueDay: undefined,
      isEmpty: true,
      isDisabled: false,
      dueEmpty: true,
      dueDisabled: false
    }

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDueDayChange = this.handleDueDayChange.bind(this);
  }

  handleDayChange(assignedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      assignedDay,
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true,
    });
  }

  handleDueDayChange(dueDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      dueDay,
      dueEmpty: !input.value.trim(),
      dueDisabled: modifiers.disabled === true,
    });
  }

  showNextStep(e) {
    console.log(e.target.value);
  }

  render() {
    const { assignedDay, isDisabled, isEmpty } = this.state;
    const { dueDay, dueDisabled, dueEmpty } = this.state;

    return (
        <div>
          <h1>Assignment Blueprint Tool – Plan Your Assignment!</h1>
          <h2 className="mb-5">{this.state.assignmentTitle}</h2>
          <p>Use this planning tool to develop a WCF strategy and timeline for a specific assignment.</p>
          <p>This tool will help you to:</p>
            <ul>
              <li>
              Breakdown an assignment into several integrated deadlines that support your WCF strategy
              </li>
              <li>
              Tailor a detailed WCF strategy to this assignment that includes the error categories you will be targeting and the specific method you will use to annotate these errors
              </li>
            </ul>
          <p>Before using this tool, you’ll need:</p>
            <ul>
              <li>
              A general sense of the learning outcomes, requirements, and approximate deadline of a writing assignment students will have to prepare for your course
              </li>
            </ul>
          <div id="step_1">
            <h5>Step 1: Assignment Flowchart</h5>
            <p>Enter date the assignment will be distributed to students:</p>
            <div className="mb-5">
            <DayPickerInput
              value={assignedDay}
              onDayChange={this.handleDayChange}
              dayPickerProps={{
                assignedDays: assignedDay,
                disabledDays: {
                  daysOfWeek: [0, 6],
                },
              }}
            />
          </div>
          <p>Enter date the assignment will be due from students:</p>
            <div className="mb-5">
            <DayPickerInput
              value={dueDay}
              onDayChange={this.handleDueDayChange}
              dayPickerProps={{
                assignedDays: dueDay,
                disabledDays: {
                  daysOfWeek: [0, 6],
                },
              }}
            />
          </div>
            <div className="d-flex justify-content-center container-fluid mt-8">
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
                    {assignedDay &&
                    !isDisabled &&
                    `${assignedDay.toLocaleDateString()}`}
                    </td>
                  </tr>
                  <tr className="d-flex">
                    <th scope="row" className="col-6">Assignment Deadline</th>
                    <td className="col-6">
                    {dueDay &&
                    !dueDisabled &&
                    `${dueDay.toLocaleDateString()}`}
                    </td>
                  </tr>
                  <tr className="d-flex">
                    <th scope="row" className="col-6">Expected Date to Return Corrected Work to Students</th>
                    <td className="col-6"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="btn btn-primary" value="1" onClick={this.showNextStep}>Next Step</button>
          </div>
          <div className="initiallyHidden" id="step_2">
            <h5 >Step 2: Determining Error Types for Focused Feedback</h5>
          </div>
            <div className="initiallyHidden" id="step_3">
          <h5>Step 3: Determining the Directness of Feedback</h5>
          </div>
          <div className="initiallyHidden" id="step_4">
            <h5>Step 4: Setting Student Expectations</h5>
          </div>
          <div className="initiallyHidden" id="step_5">
            <h5>Step 5: Determine What Learners Will Have to Do In Response to Your WCF Strategy</h5>
          </div>
          <div className="initiallyHidden" id="step_6">
            <h5>Step 6: Peer WCF (Optional) </h5>
          </div>
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