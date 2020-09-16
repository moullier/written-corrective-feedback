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
      activeStep: 0,
      tool1ID: undefined,
      directnessLevel: "",
      correction_types: [],
      studentProficiencyLevel: ""
    }

    this.showNextStep = this.showNextStep.bind(this);
  }

  componentDidMount() {
    // attempt to fetch a tool1 from database, if one exists
    Axios.get("/api/tool1/" + this.state.assignmentId)
    .then((tool1data) => {
      console.log("tool1data.data is: ");
      console.log(tool1data.data);
      
      // if there is a tool1 in the database
      if(tool1data.data !== null) {

        const {studentProficiencyLevel, directnessLevel} = tool1data.data;
        const tool1ID = tool1data.data.id;

        Axios.get("/api/correction_types/" + tool1ID)
        .then((ct_res) => {
          console.log(ct_res.data);

          // format correction types as an array of strings
          const correction_types = ct_res.data.map(el => el.category);
          console.log(correction_types);
          
          this.setState({
            tool1ID: tool1ID,
            directnessLevel: directnessLevel,
            correction_types: correction_types,
            studentProficiencyLevel: studentProficiencyLevel
          })

        });


      } else {
        // the tool1 has not been started -- not sure what workflow we want here

      }
    });
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
            <h5>Step 1: Summarize Your WCF Strategy</h5>
            <h5>(Error Categories, Methods, Content)</h5>
            <p>Below are the the error categories you will be targeting for this assignment, from your work on the Assignment Blueprint (Tool 1)</p>
            <p><strong>1 - Focused Feedback Error Categories:</strong></p>
            <div className="mb-3">
              <ul>
                {this.state.correction_types.map(el => (<li>{el}</li>))}
              </ul>
            </div>
            <p><strong>2 - Method for Targeting Error Categories</strong></p>
            <p>{this.state.directnessLevel}</p>
            <p><strong>3 - Feedback on Content</strong></p>
            <p>To be truly effective, WCF on error categories needs to be combined with feedback on, or a response to, the literal content of a student’s writing assignment. Make sure you’re responding to the content of each and every assignment as you work your way through the pile. Now that you’ve summarized your WCF strategy, you’re ready to grade. Go on to the next step which includes a brief checklist of things to think about as you’re grading assignments.</p>
          </div>
          <div id="step_2" className="initiallyHidden">
            <h5>Step 2 - Things to Consider as You’re Grading</h5>
            <p>Each step of your WCF strategy presents a few specific challenges. While grading, use this tool to make sure you stick to the strategy you worked hard to develop.</p>
          </div>
          <button className="btn btn-primary mr-3 mt-3" value="1" id="nextStepButton" onClick={this.showNextStep}>Next Step</button>
          <br />
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
  
export default Tool2;