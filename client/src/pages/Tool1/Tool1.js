import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "./index.css"
import Axios from "axios";
import $ from "jquery";
// import Popper from 'popper.js';
import 'bootstrap/js/dist/dropdown';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import "react-day-picker/lib/style.css";
import Select from 'react-select';


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
      returnDay: undefined,
      expectationsDay: undefined,
      isEmpty: true,
      isDisabled: false,
      dueEmpty: true,
      dueDisabled: false,
      returnEmpty: true,
      returnDisabled: false,
      expectationsEmpty: true,
      expectationsDisabled: false,
      activeStep: 0,
      selectedCorrectionTypes: [],
      directnessLevel: undefined,
      toolExistsInDB: undefined
    }

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDueDayChange = this.handleDueDayChange.bind(this);
    this.handleReturnDayChange = this.handleReturnDayChange.bind(this);
    this.handleExpectationsDayChange = this.handleExpectationsDayChange.bind(this);
    this.handleDDChange = this.handleDDChange.bind(this);
    this.showNextStep = this.showNextStep.bind(this);
    this.handleDirectnessChange = this.handleDirectnessChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {

    // attempt to fetch a tool1 from database, if one exists
    Axios.get("/api/tool1/" + this.state.assignmentId)
    .then((tool1data) => {
      console.log(tool1data);
    })
    .catch((err) => {
      console.log("I am an error");
      console.log(err);
    })
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

  handleReturnDayChange(returnDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      returnDay,
      returnEmpty: !input.value.trim(),
      returnDisabled: modifiers.disabled === true,
    });
  }

  
  handleExpectationsDayChange(expectationsDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      expectationsDay,
      expectationsEmpty: !input.value.trim(),
      expectationsDisabled: modifiers.disabled === true,
    });
  }

  // hide the current step and show the next one
  // save data to db
  showNextStep(e) {
    console.log("activeStep: " + this.state.activeStep);
    console.log("assignmentId: " + this.state.assignmentId);

    Axios.post("/api/new_tool1/" + this.state.assignmentId, {
      dateAssigned: this.state.assignedDay,
      dueDate: this.state.dueDay,
      returnDate: this.state.returnDay,
      AssignmentId: this.state.assignmentId
    })
    .then(res => {
      console.log(res);

      let currentStepString = "#step_" + this.state.activeStep;
      let nextStep = parseInt(this.state.activeStep) + 1;
      let nextStepString = "#step_" + nextStep;
      if(this.state.activeStep === 1) {
        $("#step_0").hide();
      }
      $(currentStepString).hide();
      $(nextStepString).show();

      this.setState({activeStep: this.state.activeStep + 1});


    })
  }

  handleDDChange(e) {
    console.log(e);
    this.setState({selectedCorrectionTypes: Array.isArray(e) ? e.map(x => x.value) : []})
  }

  handleDirectnessChange(e) {
    console.log(e.value);
    this.setState({directnessLevel: e.value});
  }

  render() {
    const { assignedDay, isDisabled, isEmpty } = this.state;
    const { dueDay, dueDisabled, dueEmpty } = this.state;
    const { returnDay, returnDisabled, returnEmpty } = this.state;
    const { expectationsDay, expectationsDisabled, expectationsEmpty } = this.state;

    const correctionOptions = [
      { value: 'Verb Form (conjugation)', label: 'Verb Form (conjugation)'},
      { value: 'Verb Tense (time, aspect or mode)', label: 'Verb Tense (time, aspect or mode)'},
      { value: 'SentenceStructure', label: 'Sentence Structure' },
      { value: 'Word Order', label: 'Word Order' },
      { value: 'Word Choice', label: 'Word Choice' },
      { value: 'Prepositions', label: 'Prepositions' },
      { value: 'Word Form', label: 'Word Form' },
      { value: 'Spelling', label: 'Spelling' },
      { value: 'Punctuation', label: 'Punctuation' },
      { value: 'Capital Letter', label: 'Capital Letter' },
      { value: 'Insert something', label: 'Insert something' },
      { value: 'Omit something', label: 'Omit something' },
      { value: 'Meaning is not clear', label: 'Meaning is not clear' },
      { value: 'Awkward', label: 'Awkward' }                  
    ]

    const directnessOptions = [
      { value: 'Explicit correction', label: 'Explicit correction'},
      { value: 'Explicit correction + metalinguistic explanations', label: 'Explicit correction + metalinguistic explanations'},
      { value: 'Underlining location of errors + metalinguistic explanations', label: 'Underlining location of errors + metalinguistic explanations'},
      { value: 'Underlining location of errors + use of a correction code', label: 'Underlining location of errors + use of a correction code'},
      { value: 'Underlining location of errors', label: 'Underlining location of errors' }
    ]

    let languageProficiencyModal = <div className="modal" id="languageProficiencyModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Language Proficiency Levels</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.clearNewClass}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <table className="table selectedCorrectionsTable" id="CEFRTable">
            <tbody>
              <tr className="d-flex">
                <td rowSpan="2">Proficient User</td>
                <td>C2</td>
                <td>Can understand with ease virtually everything heard or read. Can summarise information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation. Can express him/herself spontaneously, very fluently and precisely, differentiating finer shades of meaning even in more complex situations.</td>
              </tr>
              <tr>
                <td>C1</td>
                <td>text text</td>
              </tr>
              <tr className="d-flex">
                <td rowSpan="2">Independent User</td>
                <td>B2</td>
                <td>text text</td>
              </tr>
              <tr>
                <td>B1</td>
                <td>text text</td>
              </tr>
              <tr className="d-flex">
                <td rowSpan="2">Basic User</td>
                <td>A2</td>
                <td>text text</td>
              </tr>
              <tr>
                <td>A1</td>
                <td>text text</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={this.createNewAssignment}>Save changes</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>;



    return (
        <div className="container">
          <h1>Assignment Blueprint Tool – Plan Your Assignment!</h1>
          <h2 className="mb-5">{this.state.assignmentTitle}</h2>
          <div id="step_0">
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
          </div>
          <div id="step_1" className="initiallyHidden">
            <h5>Step 1: Assignment Flowchart</h5>
            <p>Enter date the assignment will be distributed to students:</p>
            <div className="mb-3">
            <DayPickerInput
              value={assignedDay}
              onDayChange={this.handleDayChange}
              dayPickerProps={{
                assignedDays: assignedDay
              }}
            />
          </div>
          <p>Enter date the assignment will be due from students:</p>
            <div className="mb-3">
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
          <p>Enter date you anticipate returning the graded assignment to students:</p>
            <div className="mb-3">
              <DayPickerInput
                value={returnDay}
                onDayChange={this.handleReturnDayChange}
                dayPickerProps={{
                  assignedDays: returnDay,
                  disabledDays: {
                    daysOfWeek: [0, 6],
                  },
                }}
              />
            </div>
            <div className="d-flex justify-content-center container-fluid mt-5">
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
                    <td className="col-6">
                    {returnDay &&
                    !returnDisabled &&
                    `${returnDay.toLocaleDateString()}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="initiallyHidden" id="step_2">
            <h5 >Step 2: Determining Error Types for Focused Feedback</h5>
            <div>
              <p>Select 3-6 error types that you will focus your corrections on for this assignment and write them into the table below. Choose carefully: you won’t be able to annotate student errors outside of these categories in any way. </p>
              <p>Here are a few examples drawn from Kurzer (2019) to get you started. Feel free to choose the ones that work best for this assignment and your institutional setting, or write your own.</p>
            </div>
            <div className="selectDD">
              <Select 
                isMulti
                options={correctionOptions}
                onChange={this.handleDDChange} // assign onChange function
              />
            </div>
            {/* <div><b>Selected Value: </b> {JSON.stringify(this.state.selectedCorrectionTypes, null, 2)}</div> */}
            <div className="d-flex justify-content-center container-fluid mt-5">
              <table className="table selectedCorrectionsTable">
                <thead className="thead-light">
                  <tr className="d-flex">
                    <th scope="col" className="col-4">1</th>
                    <th scope="col" className="col-4">2</th>
                    <th scope="col" className="col-4">3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="d-flex" id="correctionsRow">
                    <td scope="row" className="col-4">
                      {this.state.selectedCorrectionTypes[0]}
                    </td>
                    <td className="col-4">
                      {this.state.selectedCorrectionTypes[1]}
                    </td>
                    <td className="col-4">
                      {this.state.selectedCorrectionTypes[2]}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="initiallyHidden" id="step_3">
            <h5>Step 3: Determining the Directness of Feedback</h5>
            <p>Using the expected language proficiency of the average learner as a guide, select the type of focused feedback students will receive on this assignment.</p>
            <table className="table feedbackTable">
              <thead className="thead-light">
                <tr className="d-flex">
                  <th scope="col" className="col-4">Novice (A1 and A2)</th>
                  <th scope="col" className="col-4">Intermediate (B1 and B2)</th>
                  <th scope="col" className="col-4">Advanced (B2+ and C1)</th>
                </tr>
                <tr className="d-flex">
                  <th scope="col" className="col-4">Direct Feedback</th>
                  <th scope="col" className="col-4">Indirect Feedback</th>
                  <th scope="col" className="col-4">Very Indirect Feedback</th>
                </tr>
              </thead>
              <tbody>
                <tr className="d-flex">
                  <td scope="row" className="col-4">
                    Explicit correction
                  </td>
                  <td className="col-4">
                    Underlining location of errors + metalinguistic explanations about their errors
                  </td>
                  <td className="col-4">
                    Underlining location of errors
                  </td>
                </tr>
                <tr className="d-flex">
                  <td scope="row" className="col-4">
                    Explicit correction + metalinguistic explanations about their errors
                  </td>
                  <td className="col-4">
                    Underlining location of errors + use of a <strong>correction code</strong>
                  </td>
                  <td className="col-4">
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="selectDD">
              <Select 
                options={directnessOptions}
                onChange={this.handleDirectnessChange} // assign onChange function
              />
            </div>
            <button className="btn btn-link mb-3" data-toggle="modal" data-target="#languageProficiencyModal">See More Info</button>
          {languageProficiencyModal}
          </div>
          <div className="initiallyHidden" id="step_4">
            <h5>Step 4: Setting Student Expectations</h5>
            <table className="table modalTable">
              {/* <thead className="thead-light">
                <tr className="d-flex">
                  <th scope="col" className="col-4">1</th>
                  <th scope="col" className="col-8">2</th>
                </tr>
              </thead> */}
              <tbody>
                <tr className="d-flex">
                  <td scope="row" className="col-4">
                    <p>What information about your WCF strategy from steps 2 and 3 do you need to communicate to students before the assignment is completed?</p>
                  </td>
                  <td className="col-8">
                    <form id="step4strategies">
                      <textarea className="form-control" id="step4strategiesText" name="textarea" value={this.state.step4info} onChange={this.handleTextAreaChange} />
                    </form>
                  </td>
                </tr>
                <tr className="d-flex">
                  <td scope="row" className="col-4">
                    <p>How will this be done?</p>
                  </td>
                  <td className="col-8">
                    <form id="step4methods">
                      <textarea className="form-control" id="step4methodsText" name="textarea" value={this.state.step4method} onChange={this.handleTextAreaChange} />
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>When will this be done?</p>              
            <DayPickerInput
              value={expectationsDay}
              onDayChange={this.handleExpectationsDayChange}
              dayPickerProps={{
                assignedDays: expectationsDay
              }}
            />
            <p className="my-3">{expectationsDay &&
              !expectationsDisabled &&
              `${expectationsDay.toLocaleDateString()}`}
            </p>
          </div>
          <div className="initiallyHidden" id="step_5">
            <h5>Step 5: Determine What Learners Will Have to Do In Response to Your WCF Strategy</h5>
            <p>Select one or several tasks that learners will have to complete after receiving your WCF.</p>
            <h6 className="mt-5">Possible Student Responses to Instructor WCF</h6>
            <table className="table">
              <thead className="thead-light">
                <tr className="d-flex">
                  <th scope="col" className="col-6">Direct Feedback</th>
                  <th scope="col" className="col-6">Indirect Feedback</th>
                </tr>
              </thead>
              <tbody>
                <tr className="d-flex">
                  <td scope="row" className="col-6">
                    <p>Personal log of frequency of errors by type</p>
                  </td>
                  <td className="col-6">
                    <p>Personal log of frequency of errors by type</p>
                  </td>
                </tr>
                <tr className="d-flex">
                  <td scope="row" className="col-6">
                    <p>Revise text based on <strong>instructor corrections</strong></p>
                  </td>
                  <td className="col-6">
                  <p>Revise text based on <strong>self-correction</strong></p>
                  </td>
                </tr>
                <tr className="d-flex">
                  <td scope="row" className="col-6">
                    <p>Personal reflection on errors</p>
                  </td>
                  <td className="col-6">
                    <p>Personal reflection on errors</p>
                  </td>
                </tr>
                <tr className="d-flex">
                  <td scope="row" className="col-6">
                    <p>Other assignment based on errors</p>
                  </td>
                  <td className="col-6">
                    <p>Other assignment based on errors</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="initiallyHidden" id="step_6">
            <h5>Step 6: Peer WCF (Optional) </h5>
            <p>In this final optional step, consider whether or not students will be providing WCF to each other before they submit the assignment by the deadline you set in Step 1. Lee (2019) recommends that students determine 1-2 error categories that they find personally difficult and have peers provide feedback on only those categories on a draft version of their assignment.  </p>
          </div>
          <button className="btn btn-primary mr-3" value="1" onClick={this.showNextStep}>Next Step</button>
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
  
export default Tool1;