import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import Axios from "axios";
import $ from "jquery";
// import Popper from 'popper.js';
// import 'bootstrap/js/dist/dropdown';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import "react-day-picker/lib/style.css";
// import Select from 'react-select';
import Tool2Step0 from "../../components/Tool2Step0";
// import Choices from "../../components/Choices";


class Tool2 extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.location.state);
    // check if this.props.location.state exists, in case user is coming from another route than 
    // from the assigment page


    this.state = {
      uid: this.props.location.state.uid,
      classId: this.props.location.state.classId,
      classTitle: this.props.location.state.classTitle,
      assignmentId: this.props.location.state.assignmentId,
      assignmentTitle: this.props.location.state.assignmentTitle,
      tool2Exists: false,
      activeStep: 0
    }

    this.showNextStep = this.showNextStep.bind(this);
  }

  componentDidMount() {
    console.log("Tool2 did mount");
  }

  showNextStep(e) {

    let currentStepString = "step_" + this.state.activeStep;
    let nextStep = parseInt(this.state.activeStep) + 1;
    let nextStepString = "#step_" + nextStep;

    currentStepString = "#" + currentStepString;
    if(this.state.activeStep === 1) {
      $("#step_0").hide();
    }
    $(currentStepString).hide();
    $(nextStepString).show();

    this.setState({activeStep: this.state.activeStep + 1});

  }

  render() {
    return (
        <div className="container">
          <h1>WCF Grading Checklist Tool – Stay Focused While Grading!</h1>
          <h2 className="mb-5">{this.state.assignmentTitle}</h2>
          <Tool2Step0 />
          <div id="step_1" className="initiallyHidden">
            Step 1
          </div>
          <div id="step_2" className="initiallyHidden">
            Step 2
          </div>
          <button className="btn btn-primary mr-3 mt-3" value="1" id="nextStepButton" onClick={this.showNextStep}>Next Step</button>
        </div>

    )
  }
}
  
export default Tool2;