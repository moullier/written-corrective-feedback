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
import Tool1Step0 from "../../components/Tool1Step0";
import Choices from "../../components/Choices";


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
      toolExistsInDB: undefined,
      tool1ID: null,
      activeStep: 0,
      completed: false,
      // step 2 information
      selectedCorrectionTypes: [],
      // step 3 information
      studentProficiencyLevel: undefined,
      directnessLevel: undefined,
      // step 5 information
      studentResponseAssignment: undefined,
      // state for dayPicker components
      // step 1 dates:
      assignedDay: undefined,
      dueDay: undefined,
      returnDay: undefined,
      isEmpty: true,
      isDisabled: false,
      dueEmpty: true,
      dueDisabled: false,
      returnEmpty: true,
      returnDisabled: false,
      // step 4 dates:
      expectationsDay: undefined,
      expectationsEmpty: true,
      expectationsDisabled: false,
      // step 5 dates:
      responseDueDay: undefined,
      responseDueEmpty: true,
      responseDueDisabled: false,
      responseReturnDay: undefined,
      responseReturnEmpty: true,
      responseReturnDisabled: false,
      // step 6 dates:
      peerWCFDay: undefined,
      peerWCFEmpty: true,
      peerWCFDisabled: false
    }

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDueDayChange = this.handleDueDayChange.bind(this);
    this.handleReturnDayChange = this.handleReturnDayChange.bind(this);
    this.handleExpectationsDayChange = this.handleExpectationsDayChange.bind(this);
    this.handleResponseDueDayChange = this.handleResponseDueDayChange.bind(this);
    this.handleResponseReturnDayChange = this.handleResponseReturnDayChange.bind(this);
    this.handlePeerWCFChange = this.handlePeerWCFChange.bind(this);
    this.handleDDChange = this.handleDDChange.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.showNextStep = this.showNextStep.bind(this);
    this.handleDirectnessChange = this.handleDirectnessChange.bind(this);
    this.handleStudentProficiencyChange = this.handleStudentProficiencyChange.bind(this);
    this.handleStudentResponseAssignmentChange = this.handleStudentResponseAssignmentChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {

    // attempt to fetch a tool1 from database, if one exists
    Axios.get("/api/tool1/" + this.state.assignmentId)
    .then((tool1data) => {
      console.log("tool1data.data is: ");
      console.log(tool1data.data);
      let dataExists = false;
      let tool1ID = null;
      let assignedDay, dueDay, returnDay, expectationsDay, responseDueDay, responseReturnDay, peerWCFDay;
      let dueDayObj, assignedDayObj, returnDayObj, expectationsDayObj, responseDueDayObj, responseReturnDayObj, peerWCFDayObj;

      console.log(peerWCFDayObj);
      
      // if a database record exists for the tool, parse the dates and set the state
      if(tool1data.data) {
        dataExists = true;
        tool1ID = tool1data.data.id;

        // all dates retrieved
        assignedDay = tool1data.data.dateAssigned;
        dueDay = tool1data.data.dueDate;
        returnDay = tool1data.data.returnDate;
        expectationsDay = tool1data.data.expectationsDate;
        responseDueDay = tool1data.data.responseDueDate;
        responseReturnDay = tool1data.data.responseReturnDate;
        peerWCFDay = tool1data.data.peerWCFDate;

        // other data retreived
        const {studentProficiencyLevel, directnessLevel, expectationsSet,
          expectationsHow, studentResponseAssignment, completed} = tool1data.data;
        // const directnessLevel = tool1data.data.directnessLevel;
        console.log(directnessLevel);
        // const expectationsSet = tool1data.data.expectationsSet;
        // const expectationsHow = tool1data.data.expectationsHow;
        // const completed = tool1data.data.completed;

        // const {id,title} = post.data


        // check if date returned from database is null
        if(assignedDay) {
          assignedDayObj = this.parseDBDate2(assignedDay);
          console.log(assignedDayObj);
        } else {
          assignedDayObj = undefined;
        }

        // check if date returned from database is null
        if(dueDay) {
          dueDayObj = this.parseDBDate2(dueDay);
          console.log(dueDayObj);
        } else {
          dueDayObj = undefined;
        }

        // check if date returned from database is null
        if(returnDay) {
          returnDayObj = this.parseDBDate2(returnDay);
          console.log(returnDayObj);
        } else {
          returnDayObj = undefined;
        }

        // check if date returned from database is null
        if(expectationsDay) {
          expectationsDayObj = this.parseDBDate2(expectationsDay);
          console.log(expectationsDayObj);
        }

        // check if date returned from database is null
        if(responseDueDay) {
          responseDueDayObj = this.parseDBDate2(responseDueDay);
          console.log(responseDueDayObj);
        }
        
        // check if date returned from database is null
        if(responseReturnDay) {
          responseReturnDayObj = this.parseDBDate2(responseReturnDay);
          console.log(responseReturnDayObj);
        }

        // check if date returned from database is null
        if(peerWCFDay) {
          peerWCFDayObj = this.parseDBDate2(peerWCFDay);
          console.log(peerWCFDayObj);
        }

        Axios.get("/api/correction_types/" + tool1ID)
        .then((ct_res) => {
          console.log(ct_res.data);
          
          // format correction types as an array of strings
          const correction_types = ct_res.data.map(el => el.category);
          console.log(correction_types);

          this.setState({
            toolExistsInDB: dataExists,
            tool1ID: tool1ID,
            assignedDay: assignedDayObj,
            dueDay: dueDayObj,
            returnDay: returnDayObj,
            expectationsDay: expectationsDayObj,
            responseDueDay: responseDueDayObj,
            responseReturnDay: responseReturnDayObj,
            peerWCFDay: peerWCFDayObj,
            selectedCorrectionTypes: correction_types,
            studentProficiencyLevel: studentProficiencyLevel,
            directnessLevel: directnessLevel,
            expectationsSet: expectationsSet,
            expectationsHow: expectationsHow,
            studentResponseAssignment: studentResponseAssignment,
            completed: completed
          })

        })

      } else {
        // no data yet exists in database for this tool1
        this.setState({
          toolExistsInDB: false,
        })
      }

    })
    .catch((err) => {
      console.log("I am an error");
      console.log(err);
    })
  }

  parseDBDate(inputDate) {
    console.log("input date is:");
    console.log(inputDate);
    let dateTimeParts = inputDate.split(/[- :TZ]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
    dateTimeParts[1]--; // monthIndex begins with 0 for January and ends with 11 for December so we need to decrement by one
    console.log(dateTimeParts);
    const dateObject = new Date(...dateTimeParts); // our Date object
    console.log("output date is: ");
    console.log(dateObject);
    // console.log(typeof(dateObject));

    return dateObject;

  }

  parseDBDate2(inputDate) {
    console.log("input date is:");
    console.log(inputDate);
    const dateObject = new Date(inputDate); // our Date object
    console.log("output date is: ");
    console.log(dateObject);

    return dateObject;

  }


  handleDayChange(assignedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();

    console.log(assignedDay);
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

  handleResponseDueDayChange(responseDueDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      responseDueDay,
      responseDueEmpty: !input.value.trim(),
      responseDueDisabled: modifiers.disabled === true,
    });
  }

  handleResponseReturnDayChange(responseReturnDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      responseReturnDay,
      responseReturnEmpty: !input.value.trim(),
      responseReturnDisabled: modifiers.disabled === true,
    });
  }

  handlePeerWCFChange(peerWCFDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      peerWCFDay,
      peerWCFEmpty: !input.value.trim(),
      peerWCFDisabled: modifiers.disabled === true,
    });  
  }


  // hide the current step and show the next one
  // save data to db
  showNextStep(e) {
    console.log("activeStep: " + this.state.activeStep);
    console.log("assignmentId: " + this.state.assignmentId);

    if(this.state.activeStep === 2 && (this.state.selectedCorrectionTypes.length < 3 || this.state.selectedCorrectionTypes.length > 6)) {
      if(this.state.selectedCorrectionTypes.length < 3) {
        $("#selectMoreError").show();
      } else {
        console.log("too many choices");
      }
    } else if(!this.state.toolExistsInDB && this.state.activeStep > 0) {
      // create new database entry
      console.log("making new db entry");
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
  
        this.setState({
          activeStep: this.state.activeStep + 1,
          toolExistsInDB: true,
          tool1ID: res.data.id
        });
      })
    } else {
      console.log("updating db entry");
      // update existing database entry
      let updateObject;
      
      switch(this.state.activeStep) {
        case 1:
          console.log("updating on step 1");
          updateObject = {
            dateAssigned: this.state.assignedDay,
            dueDate: this.state.dueDay,
            returnDate: this.state.returnDay
          };
          break;
        case 2:
          console.log("updating on step 2");
          updateObject = {
            correctionTypes: this.state.selectedCorrectionTypes
          };
          break;
        case 3:
          console.log("updating on step 3");
          updateObject = {
            studentProficiencyLevel: this.state.studentProficiencyLevel,
            directnessLevel: this.state.directnessLevel
          };
          break;
        case 4:
          console.log("updating on step 4");
          updateObject = {
            expectationsSet: this.state.expectationsSet,
            expectationsHow: this.state.expectationsHow,
            expectationsDate: this.state.expectationsDay
          };
          break;
        case 5:
          console.log("updating on step 5");
          $("#nextStepButton").text("Finish and Save");
          updateObject = {
            studentResponseAssignment: this.state.studentResponseAssignment,
            responseDueDate: this.state.responseDueDay,
            responseReturnDate: this.state.responseReturnDay
          };
          break;
        case 6:
          console.log("updating on step 6");
          updateObject = {
            peerWCFDate: this.state.peerWCFDay,
            completed: true
          };
          break;
        default:
          break;
    
      }

      let currentStepString = "step_" + this.state.activeStep;
      let nextStep = parseInt(this.state.activeStep) + 1;
      let nextStepString = "#step_" + nextStep;

      if(this.state.activeStep !== 0) {
        Axios.put("/api/tool1/" + currentStepString +"/" + this.state.tool1ID, updateObject)
        .then(res => {
          console.log(res);
  
          currentStepString = "#" + currentStepString;

          if(this.state.activeStep === 1) {
            $("#step_0").hide();
          } else if(this.state.activeStep === 6) {
            // go to back to assignment hub page
            this.props.history.push({
              pathname: "/assignment",
              state: { 
                uid: this.props.location.state.uid,
                classId: this.props.location.state.classId,
                classTitle: this.props.location.state.classTitle,
                assignmentId: this.props.location.state.assignmentId,
                assignmentTitle: this.props.location.state.assignmentTitle
              }
            });
          }
          $(currentStepString).hide();
          $(nextStepString).show();
  
          this.setState({activeStep: this.state.activeStep + 1});
        })
      } else {
        currentStepString = "#" + currentStepString;
        if(this.state.activeStep === 1) {
          $("#step_0").hide();
        }
        $(currentStepString).hide();
        $(nextStepString).show();

        this.setState({activeStep: this.state.activeStep + 1});
      }

    }

  }

  handleDDChange(e) {
    console.log(e);
    this.setState({selectedCorrectionTypes: Array.isArray(e) ? e.map(x => x.value) : []})
  }

  handleDirectnessChange(e) {
    console.log(e.value);
    this.setState({directnessLevel: e.value},
      () => {
        if(this.state.directnessLevel === "Underlining location of errors + use of a correction code") {
          $("#enterCorrectionCodeDiv").show();
        } else {
          // possibly clear out any selected correction code here?
          $("#enterCorrectionCodeDiv").hide();
        }
      });
  }

  handleStudentProficiencyChange(e) {
    console.log(e.value);
    this.setState({studentProficiencyLevel: e.value},
      () => {
        $("#selectDirectnessDiv").show();
      });
  }

  handleStudentResponseAssignmentChange(e) {
    console.log(e.value);
    this.setState({studentResponseAssignment: e.value});
  }

  handleTextAreaChange(e) {
    const fieldName = e.target.name;
    this.setState({[fieldName]: e.target.value});
  }

  // handles callback from Choices child component
  changeHandler = (childData) => {
    console.log(childData);
    console.log(typeof(childData));
    if(childData == "max choices exceeded") {
      $("#maxSelected").show();
    } else {
      $("#maxSelected").hide();
      this.setState({selectedCorrectionTypes: childData});
    }
  }


  render() {
    const { assignedDay, isDisabled, isEmpty } = this.state;
    const { dueDay, dueDisabled, dueEmpty } = this.state;
    const { returnDay, returnDisabled, returnEmpty } = this.state;
    const { expectationsDay, expectationsDisabled, expectationsEmpty } = this.state;
    const { responseDueDay, responseDueDisabled, responseDueEmpty } = this.state;
    const { responseReturnDay, responseReturnDisabled, responseReturnEmpty } = this.state;
    const { peerWCFDay, peerWCFDisabled, peerWCFEmpty} = this.state;

    // calculate className for column widths based on number of correction types selected
    console.log("number of correction types selected:" + this.state.selectedCorrectionTypes.length);
    if(this.state.selectedCorrectionTypes.length > 2) {
      $("#selectMoreError").hide();
    }

    let secondCorrectionsRow = (this.state.selectedCorrectionTypes.length > 3 ) ? 
    <tr className="d-flex" id="correctionsRow">
      <td className="col-4">
        {this.state.selectedCorrectionTypes[3]}
      </td>
      <td className="col-4">
        {this.state.selectedCorrectionTypes[4]}
      </td>
      <td className="col-4">
        {this.state.selectedCorrectionTypes[5]}
      </td>
    </tr> : "";


    // const correctionOptions = [
    //   { value: 'Verb Form (conjugation)', label: 'Verb Form (conjugation)'},
    //   { value: 'Verb Tense (time, aspect or mode)', label: 'Verb Tense (time, aspect or mode)'},
    //   { value: 'Sentence Structure', label: 'Sentence Structure' },
    //   { value: 'Word Order', label: 'Word Order' },
    //   { value: 'Word Choice', label: 'Word Choice' },
    //   { value: 'Prepositions', label: 'Prepositions' },
    //   { value: 'Word Form', label: 'Word Form' },
    //   { value: 'Spelling', label: 'Spelling' },
    //   { value: 'Punctuation', label: 'Punctuation' },
    //   { value: 'Capital Letter', label: 'Capital Letter' },
    //   { value: 'Insert something', label: 'Insert something' },
    //   { value: 'Omit something', label: 'Omit something' },
    //   { value: 'Meaning is not clear', label: 'Meaning is not clear' },
    //   { value: 'Awkward', label: 'Awkward' }                  
    // ]

    const correctionOptions = [
      'Verb Form (conjugation)',
      'Verb Tense (time, aspect or mode)',
      'Sentence Structure',
      'Word Order',
      'Word Choice',
      'Prepositions',
      'Word Form',
      'Spelling',
      'Punctuation',
      'Capital Letter',
      'Insert something',
      'Omit something',
      'Meaning is not clear',
      'Awkward'              
    ];

    const studentProficiencyLevels = [
      { value: 'Novice (A1 and A2)', label: 'Novice (A1 and A2)'},
      { value: 'Intermediate (B1 and B2)', label: 'Intermediate (B1 and B2)'},
      { value: 'Advanced (B2+ and C1)', label: 'Advanced (B2+ and C1)'}
    ];

    let directnessOptions = [
      { value: 'Explicit correction', label: 'Explicit correction'},
      { value: 'Explicit correction + metalinguistic explanations', label: 'Explicit correction + metalinguistic explanations'},
      { value: 'Underlining location of errors + metalinguistic explanations', label: 'Underlining location of errors + metalinguistic explanations'},
      { value: 'Underlining location of errors + use of a correction code', label: 'Underlining location of errors + use of a correction code'},
      { value: 'Underlining location of errors', label: 'Underlining location of errors' }
    ];


    if(this.state.studentProficiencyLevel === "Novice (A1 and A2)") {
      directnessOptions = [
        { value: 'Explicit correction', label: 'Explicit correction'},
        { value: 'Explicit correction + metalinguistic explanations', label: 'Explicit correction + metalinguistic explanations'}
      ];
    } else if (this.state.studentProficiencyLevel === 'Intermediate (B1 and B2)') {
      directnessOptions = [
        { value: 'Underlining location of errors + metalinguistic explanations', label: 'Underlining location of errors + metalinguistic explanations'},
        { value: 'Underlining location of errors + use of a correction code', label: 'Underlining location of errors + use of a correction code'}
      ];
    } else if(this.state.studentProficiencyLevel === 'Advanced (B2+ and C1)') {
      directnessOptions = [
        { value: 'Underlining location of errors', label: 'Underlining location of errors' }
      ]
    }

    let step3ValuesEntered = "";

    if(this.state.studentProficiencyLevel) {
      step3ValuesEntered = <div>
        <p><strong>Student Proficiency Level Selected:</strong></p>
        <p>{this.state.studentProficiencyLevel}</p>
        <p><strong>Type of Focused Feedback Selected:</strong></p>
      <p>{this.state.directnessLevel}</p>
      </div>
    }



    let studentResponseAssignments = [];

    if(this.state.studentProficiencyLevel === "Novice (A1 and A2)") {
      studentResponseAssignments = [
        { value: "Personal log of frequency of errors by type", label: "Personal log of frequency of errors by type" },
        { value: "Revise text based on instructor corrections", label: "Revise text based on instructor corrections"},
        { value: "Personal reflection on errors", label: "Personal reflection on errors"},
        { value: "Other assignment based on errors", label: "Other assignment based on errors"}
      ];
    } else {
      studentResponseAssignments = [
        { value: "Personal log of frequency of errors by type", label: "Personal log of frequency of errors by type" },
        { value: "Revise text based on self-correction", label: "Revise text based on self-correction"},
        { value: "Personal reflection on errors", label: "Personal reflection on errors"},
        { value: "Other assignment based on errors", label: "Other assignment based on errors"}
      ];
    }

    console.log(studentResponseAssignments);

    let studentResponseDisplay = "";
    if(this.state.studentResponseAssignment) {
      studentResponseDisplay = <div>
      <p><strong>Selected Student Response:</strong></p>
      <p>{this.state.studentResponseAssignment}
      <button className="btn btn-link" onClick={() => {$("#selectStudentResponseDiv").show()}}>(edit)</button></p>
    </div>
    };


    // let languageProficiencyModal = <div className="modal" id="languageProficiencyModal" tabIndex="-1" role="dialog">
    //   <div className="modal-dialog" role="document">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title">Language Proficiency Levels</h5>
    //         <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.clearNewClass}>
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //       </div>
    //       <div className="modal-body">
    //       <table className="table selectedCorrectionsTable" id="CEFRTable">
    //         <tbody>
    //           <tr className="d-flex">
    //             <td rowSpan="2">Proficient User</td>
    //             <td>C2</td>
    //             <td>Can understand with ease virtually everything heard or read. Can summarise information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation. Can express him/herself spontaneously, very fluently and precisely, differentiating finer shades of meaning even in more complex situations.</td>
    //           </tr>
    //           <tr>
    //             <td>C1</td>
    //             <td>text text</td>
    //           </tr>
    //           <tr className="d-flex">
    //             <td rowSpan="2">Independent User</td>
    //             <td>B2</td>
    //             <td>text text</td>
    //           </tr>
    //           <tr>
    //             <td>B1</td>
    //             <td>text text</td>
    //           </tr>
    //           <tr className="d-flex">
    //             <td rowSpan="2">Basic User</td>
    //             <td>A2</td>
    //             <td>text text</td>
    //           </tr>
    //           <tr>
    //             <td>A1</td>
    //             <td>text text</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //       </div>
    //       <div className="modal-footer">
    //         <button type="button" className="btn btn-primary" onClick={this.createNewAssignment}>Save changes</button>
    //         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>;



    return (
        <div className="container">
          <h1>Assignment Blueprint Tool – Plan Your Assignment!</h1>
          <h2 className="mb-5">{this.state.assignmentTitle}</h2>
          <Tool1Step0 id="step_0"/>
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
                assignedDays: dueDay
              }}
            />
          </div>
          <p>Enter date you anticipate returning the graded assignment to students:</p>
            <div className="mb-3">
              <DayPickerInput
                value={returnDay}
                onDayChange={this.handleReturnDayChange}
                dayPickerProps={{
                  assignedDays: returnDay
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
            {/* <div className="selectDD">
              <Select 
                isMulti
                defaultValue={[correctionOptions[1]]}
                options={correctionOptions}
                onChange={this.handleDDChange} // assign onChange function
              />
            </div> */}
            {/* <div><b>Selected Value: </b> {JSON.stringify(this.state.selectedCorrectionTypes, null, 2)}</div> */}
            <Choices
              initialChoices={correctionOptions}
              selectedChoices={this.state.selectedCorrectionTypes}
              choiceName={"Correction Types"}
              onChange={this.changeHandler}
              max={6}
            />
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
                    <td className="col-4">
                      {this.state.selectedCorrectionTypes[0]}
                    </td>
                    <td className="col-4">
                      {this.state.selectedCorrectionTypes[1]}
                    </td>
                    <td className="col-4">
                      {this.state.selectedCorrectionTypes[2]}
                    </td>
                  </tr>
                  {secondCorrectionsRow}
                </tbody>
              </table>
            </div>
            <div id="selectMoreError" className="initiallyHidden text-center alert alert-danger" role="alert">Alert: Select At Least Three Error Types</div>
            <div id="maxSelected" className="initiallyHidden text-center alert alert-danger" role="alert">Alert: Research Suggests Limiting Feedback to Six Error Types</div>
          </div>
          <div className="initiallyHidden" id="step_3">
            <h5>Step 3: Determining the Directness of Feedback</h5>
            {/* <table className="table feedbackTable">
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
                  <td className="col-4">
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
                  <td className="col-4">
                    Explicit correction + metalinguistic explanations about their errors
                  </td>
                  <td className="col-4">
                    Underlining location of errors + use of a <strong>correction code</strong>
                  </td>
                  <td className="col-4">
                  </td>
                </tr>
              </tbody>
            </table> */}
            <p>You can use the expected language proficiency of the average learner as a guide to select the type of focused feedback students will receive on this assignment.</p>
            {step3ValuesEntered}
            <div></div>
            <p>What is the expected language proficiency of students in this class? For more information you can reference the <a href="https://www.coe.int/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale" target="_blank" rel="noopener noreferrer">Common European Framework</a>.</p>
            <div className="selectDD">
              <Select 
                options={studentProficiencyLevels}
                onChange={this.handleStudentProficiencyChange} // assign onChange function
              />
            </div>
            <div className="selectDD initiallyHidden" id="selectDirectnessDiv">
              <p>Choose the type of focused feedback that students will receive on this assignment:</p>
              <Select 
                options={directnessOptions}
                onChange={this.handleDirectnessChange} // assign onChange function
                // defaultValue={{ label: this.state.directnessLevel, value: this.state.directnessLevel }}
              />
            </div>
            <div id="enterCorrectionCodeDiv" className="initiallyHidden">
              ENTER CORRECTION CODE HERE!!
            </div>
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
                      <textarea className="form-control" id="step4strategiesText" name="expectationsSet" value={this.state.expectationsSet} onChange={this.handleTextAreaChange} />
                    </form>
                  </td>
                </tr>
                <tr className="d-flex">
                  <td scope="row" className="col-4">
                    <p>How will this be done?</p>
                  </td>
                  <td className="col-8">
                    <form id="step4methods">
                      <textarea className="form-control" id="step4methodsText" name="expectationsHow" value={this.state.expectationsHow} onChange={this.handleTextAreaChange} />
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
            <p className="my-3">Date selected: {expectationsDay &&
              !expectationsDisabled &&
              `${expectationsDay.toLocaleDateString()}`}
            </p>
          </div>
          <div className="initiallyHidden" id="step_5">
            <h5>Step 5: Determine What Learners Will Have to Do In Response to Your WCF Strategy</h5>
            <p>Select one or several tasks that learners will have to complete after receiving your WCF.</p>
            <h6 className="mt-5">Possible Student Responses to Instructor WCF</h6>
            <table className="table my-3">
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
            {studentResponseDisplay}
            <div id="selectStudentResponseDiv">
              <p>Select task:</p>
              <div className="selectDD">
                <Select 
                  options={studentResponseAssignments}
                  onChange={this.handleStudentResponseAssignmentChange} // assign onChange function
                />
              </div>
            </div>
            <p>If students will have to turn this response assignment back in to you, what will the due date for this assignment be?
            </p>
            <DayPickerInput
              value={responseDueDay}
              onDayChange={this.handleResponseDueDayChange}
              dayPickerProps={{
                assignedDays: responseDueDay
              }}
            />
            <p className="my-3">Date selected: {responseDueDay &&
              !responseDueDisabled &&
              `${responseDueDay.toLocaleDateString()}`}
            </p>
            <p>By when will you hope to return this response assignment to students?
            </p>
            <DayPickerInput
              value={responseReturnDay}
              id={"responseReturnDay"}
              onDayChange={this.handleResponseReturnDayChange}
              dayPickerProps={{
                assignedDays: responseReturnDay
              }}
            />
            <p className="my-3">Date selected: {responseReturnDay &&
              !responseReturnDisabled &&
              `${responseReturnDay.toLocaleDateString()}`}
            </p>
            <p>In planning these dates, ensure that students will have time to absorb information from this feedback before they are asked to work on any new writing assignments. 
            </p>
          </div>
          <div className="initiallyHidden" id="step_6">
            <h5>Step 6: Peer WCF (Optional) </h5>
            <p>In this final optional step, consider whether or not students will be providing WCF to each other before they submit the assignment by the deadline you set in Step 1. Lee (2019) recommends that students determine 1-2 error categories that they find personally difficult and have peers provide feedback on only those categories on a draft version of their assignment.</p>
            <p>If you are having students work through peer WCF activities: what is a good date for them to do so? Remember that students will need time to complete a draft of the assignment and time to edit their work in response to peer WCF.</p>
            <DayPickerInput
              value={peerWCFDay}
              onDayChange={this.handlePeerWCFChange}
              dayPickerProps={{
                assignedDays: peerWCFDay
              }}
            />
            <p className="my-3">Date selected: {peerWCFDay &&
              !peerWCFDisabled &&
              `${peerWCFDay.toLocaleDateString()}`}
            </p>
            <p>
            That’s it! Now that you’ve completed this blueprint, you now have a clear WCF strategy and a sense of how each component of your writing assignment will be paced from beginning to end.
            </p>
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
  
export default Tool1;