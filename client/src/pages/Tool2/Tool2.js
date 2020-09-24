import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import Axios from "axios";
import $ from "jquery";
import Dropdown from 'react-bootstrap/Dropdown';
import Tool2Step0 from "../../components/Tool2Step0";

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
      studentProficiencyLevel: "",
      errorFrequencies: []
    }

    this.showNextStep = this.showNextStep.bind(this);
    this.selectFrequency = this.selectFrequency.bind(this);
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

  // advance to display the next step, and save data to the database if necessary
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

    console.log(!this.state.tool2Exists);

    if(!this.state.tool2Exists && this.state.activeStep > 0) {
      console.log("creating new db entry");
      Axios.post("/api/new_tool2/" + this.state.assignmentId, {})
      .then(res => {
        console.log(res.data);

        this.setState({activeStep: this.state.activeStep + 1});

      });

    } else if(this.state.activeStep > 0) {
      // entry in db already exists, update that entry

      console.log("HELLO");

      this.setState({activeStep: this.state.activeStep + 1});
    } else {
      console.log("what is happening");


      this.setState({activeStep: this.state.activeStep + 1});
    }



  }

  // set the frequency of which errors are occuring
  selectFrequency(e) {
    e.preventDefault();
    console.log(e.target.id);
    const index = e.target.id.charAt(0);
    const freq = e.target.id.substring(1);
    console.log(index);
    console.log(freq);
    let tempArray = this.state.errorFrequencies;
    tempArray[index] = freq;
    this.setState({errorFrequencies: tempArray});
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
            <p><strong>1 – Sticking to Your WCF Strategy</strong></p>
            <p>Each step of your WCF strategy presents a few specific challenges. While grading, use this tool to make sure you stick to the strategy you worked hard to develop. As you grade, make sure the responses to all the following statements are “true”:</p>
            <ul>
              <li>I am searching for errors in the error categories I set before I started grading this assignment</li>
              <li>Regardless of how important (word choice) or trivial (punctuation) an error is, if it is not one of my error categories, I am not annotating it. (Though I can note trends in my personal notes.)</li>
              <li>I am annotating according to the direct or indirect feedback method I determined and only that method.</li>
              <li>I am responding to student content in the margins or at the end of each assignment.</li>
            </ul>
            <p><strong>2 – Taking Notes and Calibrating Your WCF Strategy</strong></p>
            <p>When you first start using this approach, it may take a while to set “optimal” error categories for each assignment. The purpose of this sub-step is to give you a space to take notes on the relative frequency of the error categories you selected for feedback. This will help you determine if you need to change error categories for next year and if there are several recurring errors that aren’t in your categories that you need to address in other ways (since you’re not allowed to annotate them for this assignment.)</p>
            <p>As you’re grading, complete the table below by writing in the errors you set and estimating the frequency of each error type across students for this assignment. For example, after grading a third of your class, you may feel “adjective agreement” errors (one of your error categories) are common for many students. Fill in the table to reflect this and feel free to update the frequency of these errors as often as necessary. In the table below, select whether the error is common, uncommon, or rare:</p>
            <div className="container justify-content-center">
              <div className="row text-center">
                <div className="col-6">
                  <strong>Error Category</strong>
                </div>
                <div className="col-6">
                  <strong>Frequency of Error</strong>
                </div>
              </div>
                {this.state.correction_types.map((el, index) => (
                  <div className="row mb-3" key={index}>
                    <div className="col-6">
                      {el}
                    </div>
                    <div className="col-6">
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdownRarity">
                          {this.state.errorFrequencies[index] || "Select Frequency"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item id={index + "Common"} onClick={this.selectFrequency}>Common</Dropdown.Item>
                          <Dropdown.Item id={index + "Uncommon"} onClick={this.selectFrequency}>Uncommon</Dropdown.Item>
                          <Dropdown.Item id={index + "Rare"} onClick={this.selectFrequency}>Rare</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                ))}
            </div>
            <p>Finally, use the table below to track important errors you’re seeing that aren’t in your error categories. These are going to be especially important as we begin to plan grammar activities that will supplement your WCF and help students grow in areas that were not targeted by feedback on their assignment.</p>
            <div className="container">
              <div className="row text-center">
                <div className="col-4">
                  Common
                </div>
                <div className="col-4">
                  Uncommon
                </div>
                <div className="col-4">
                  Rare
                </div>
              </div>

            </div>
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