import React, { Component } from "react";
import Axios from "axios";
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Dropdown from 'react-bootstrap/Dropdown';
import "../../App.css";
import DashboardClassList from "../../components/DashboardClassList";



class Dashboard extends Component {
  constructor(props) {
    super(props);

    console.log("uid is:");
    console.log(this.props);
    // console.log(this.props.location.state.id);

    let userID = null;

    if(this.props.location.state) {
      userID = this.props.location.state.id;
    }
    console.log(userID);

    this.state = {
      uid: userID,
      institution: "",
      classList: [],
      newClassName: "",
      newClassPeriod: "Select Class Period",
      existingCourseDropdown: "Select Existing Course",
      existingCourseID: null,
      previousCourseList: [],
      successfulLoad: false,
      modalStep: 0,
      newCourse: false
    };

    // ES6 React.Component doesn't auto bind methods to itself
    // Need to bind them manually in constructor
    this.selectTimeFrame = this.selectTimeFrame.bind(this);
    this.createNewClass = this.createNewClass.bind(this);
    this.handleClassNameChange = this.handleClassNameChange.bind(this);
    this.goToClassPage = this.goToClassPage.bind(this);
    this.selectCourse = this.selectCourse.bind(this);
    this.showNewCourseInput = this.showNewCourseInput.bind(this);
    this.moveToNextStep = this.moveToNextStep.bind(this);
    this.resetModal = this.resetModal.bind(this);
    
  }

  componentDidMount() {
    Axios.get("/api/class_list/" + this.state.uid)
    .then((data) => {
      console.log(data.data);
      Axios.get("/api/course_list/" + this.state.uid)
      .then((course_data) => {
        console.log(course_data.data);
        
        let setNewCourse = !(course_data.data.length > 0);
        console.log(setNewCourse);

        this.setState({
          classList: data.data,
          previousCourseList: course_data.data,
          successfulLoad: true,
          newCourse: setNewCourse
        });
      })
    });
  }

  // In modal, check to see if new class name has been entered and time period
  // has been selected.  If so, add to database.
  createNewClass(e) {
    e.preventDefault();

    // if we are creating a new course, need to add course and class section
    if(this.state.newCourse) {

      if(this.state.newClassPeriod !== "Select Class Period") {
        // add new course to db
        console.log("add new course to database");
        Axios.post("/api/new_course/" + this.state.uid, {
          courseName: this.state.newClassName
        })
        .then((res_data) => {
          
          // console.log(res_data);
          // console.log(this.state.newClassPeriod);

          // add new class section to db, linking course id
          Axios.post("/api/new_class/" + res_data.data.id, {
            classPeriod: this.state.newClassPeriod
          })
          .then((res) => {
            // console.log(res_data.data);
            // let tempList = this.state.classList;

            // tempList.push(res_data.data);
            // console.log(tempList);
            
            Axios.get("/api/class_list/" + this.state.uid)
            .then((class_list_result) => {
              console.log(class_list_result.data);
              
              Axios.get("/api/course_list/" + this.state.uid)
              .then((course_data) => {
                
                console.log(course_data.data);

                this.setState({
                  classList: class_list_result.data,
                  previousCourseList: course_data.data
                }, () => {
                  this.resetModal();
                  $("#addClassModal").modal('hide')
                });
              })
            
            })
          })
        });
      } else {
        // if no time period has been selected
        $("#noPeriod").show();
      }
      
    } else {
      // creating a new section of a prexisting course
      console.log(this.state.existingCourseID);
      console.log(this.state.newClassPeriod);

      Axios.post("/api/new_class/" + this.state.existingCourseID, {
        classPeriod: this.state.newClassPeriod
      })
      .then((res_newClass) => {
        console.log(res_newClass.data);

        Axios.get("/api/class_list/" + this.state.uid)
        .then((class_list_result) => {
          console.log(class_list_result.data);
          
          this.setState({classList: class_list_result.data}, () => {
            this.resetModal();
            $("#addClassModal").modal('hide')
          });
        })
      })
    }

    // if(this.state.newClassName !== "") {
    //   if(this.state.newClassPeriod !== "Select Class Period") {
    //     console.log("add new class to database");
    //     Axios.post("/api/new_class/" + this.state.uid, {
    //       className: this.state.newClassName,
    //       classPeriod: this.state.newClassPeriod
    //     })
    //     .then((data) => {
    //       console.log(data);
    //       Axios.get("/api/class_list/" + this.state.uid)
    //       .then((result_data) => {
    //         console.log(result_data.data);
            // this.setState({classList: result_data.data}, () => {
            //   $("#addClassModal").modal('hide')
            // });
    //       });

    //     })
    //   } else {
    //     $("#noPeriod").show();
    //   }
    // } else {
    //   $("#noClass").show();
    // }
  }

  clearNewClass(e) {
    e.preventDefault();
  }

  goToClassPage(e) {
    console.log(e.target.value);
    this.props.history.push({
      pathname: '/class',
      state: { 
        uid: this.state.uid,
        classId: e.target.value }
     });
    window.location.reload();
  }


  handleClassNameChange(e) {
    e.preventDefault();
    console.log(e.target.value);
    if(e.target.value !== "") {
      $("#noClass").hide();
    }
    this.setState({newClassName: e.target.value});
  }

  selectTimeFrame(e) {
    e.preventDefault();
    $("#noPeriod").hide();
    this.setState({newClassPeriod: e.target.id});
  }

  // when user picks an existing course from the list of previous courses
  selectCourse(e, courseID) {

    console.log(courseID);

    this.setState({
      existingCourseDropdown: e.target.id,
      existingCourseID: courseID,
      modalStep: 1,
      newCourse: false
    });
  }

  // when user picks "Add New Course"
  showNewCourseInput() {
    $("#inputClassName").show();
    $("#inputClassLabel").show();
    this.setState({
      modalStep: 1,
      existingCourseDropdown: "Add New Course",
      newCourse: true,
      existingCourseID: null
    });
  }

  moveToNextStep() {
    if(this.state.newCourse && this.state.newClassName.length > 0) {
      $("#courseDropdown").hide();
      $("#inputClassName").hide();
      $("#inputClassLabel").hide();
      $(".next-back").hide();
      $("#timePeriodDropdown").show();
      $(".modal-footer").show();

      this.setState({
        modalStep: 2
      })
    } else if (this.state.newCourse) {
      $("#noClass").show();
    } else if(!this.state.newCourse && (this.state.existingCourseDropdown !== "Select Existing Course")
      && (this.state.existingCourseDropdown !== "Add New Course")) {
      $("#courseDropdown").hide();
      $("#inputClassName").hide();
      $("#inputClassLabel").hide();
      $(".next-back").hide();
      $("#timePeriodDropdown").show();
      $(".modal-footer").show();
      
      this.setState({
        modalStep: 2
      })
    }


  }

  // when closing modal, reset all the relevant parts of state
  resetModal() {
    console.log("resetting modal");
    $("#noClass").hide();
    $("#courseDropdown").show();
    $(".next-back").show();
    $("#inputClassName").val("");
    this.setState({
      modalStep: 0,
      newClassPeriod: "Select Class Period",
      existingCourseDropdown: "Select Existing Course",
      existingCourseID: null,
      newCourse: false,
      newClassName: ""
    })
  }

  render() {
    // hide certain input fields initially
    if(this.state.modalStep === 0 && this.state.classList.length !== 0) {
      console.log("hit option 1");
      $("#inputClassName").hide();
      $("#inputClassLabel").hide();
      $("#timePeriodDropdown").hide();
      $(".modal-footer").hide();
    } else if (this.state.modalStep === 0) {
      console.log("hit option 2");
      $(".modal-footer").hide();
      $("#timePeriodDropdown").hide();
    } else if (this.state.modalStep === 1) {
      console.log("hit option 3");
    }


    // console.log("Total Width:");
    // console.log(window.screen.width);
    let pageToRender = "";
    let mapStatement = this.state.classList.map((classEl, index) => (
      <div className="row mb-2" key={index}>
        <div className="col-4">{classEl.name}</div>
        <div className="col-4">{classEl.time_period}</div>
        <div className="col-4">
          <button 
          value={classEl.id}
          className="btn btn-primary"
          onClick={this.goToClassPage}
          >
            Class Hub
          </button>
        </div>
      </div>));
    
    if(this.state.classList.length !== 0) {
      pageToRender = <div className="container">
        <DashboardClassList classList={this.state.classList}/>
        <h3>Active Classes:</h3>
        {mapStatement}
        <button className="btn btn-secondary" data-toggle="modal" data-target="#addClassModal">Create New Class</button>
        </div>
    } else if(this.state.successfulLoad) {
      pageToRender = <div>
        <h3>No Classes Created Yet</h3>
        <h6>Enter a Class to Create Assignments</h6>
        <img className="mb-4" src={"../../../assets/images/check.png"} alt="checkmark icon" width="72" height="72" />
        <button className="btn btn-secondary" data-toggle="modal" data-target="#addClassModal">Create New Class</button>
      </div>
    } else {
      pageToRender = <div className="container d-flex justify-content-center">
        <div className="spinner-border m-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>;
    }
    return (
      <div className="Dashboard" id="mainDiv">

        {pageToRender}

        {/* modal dialogue box */}
        <div className="modal" id="addClassModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Class</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.clearNewClass}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                {this.state.previousCourseList.length > 0 ? 
                <div id="courseDropdown">
                  <label htmlFor="dropdownCourses">Choose Existing Course or Add New:</label>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdownCourses">
                    {this.state.existingCourseDropdown}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item id="addNewCourseButton" onClick={this.showNewCourseInput}>Add New Course</Dropdown.Item>
                      {this.state.previousCourseList.map((el, idx) => (
                        <Dropdown.Item id={el.name} key={idx} onClick={(event) => this.selectCourse(event, el.id)}
                        >{el.name}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                : ""}
                  <label className="mt-3" id="inputClassLabel" htmlFor="inputClassName">Enter New Course Name</label>
                  <input
                    type="text" 
                    className="form-control mb-4"
                    id="inputClassName"
                    placeholder="Enter Class Name"
                    onChange={this.handleClassNameChange}
                  />
                  <div id="timePeriodDropdown">
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="dropdownCourses">
                      {this.state.newClassPeriod}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item id="Spring 2020" onClick={this.selectTimeFrame}>Spring 2020</Dropdown.Item>
                        <Dropdown.Item id="Summer 2020" onClick={this.selectTimeFrame}>Summer 2020</Dropdown.Item>
                        <Dropdown.Item id="Fall 2020" onClick={this.selectTimeFrame}>Fall 2020</Dropdown.Item>
                        <Dropdown.Item id="Academic Year 19-20" onClick={this.selectTimeFrame}>Academic Year 19-20</Dropdown.Item>
                        <Dropdown.Item id="Academic Year 20-21" onClick={this.selectTimeFrame}>Academic Year 20-21</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div id="noPeriod" className="initiallyHidden text-center alert alert-danger" role="alert">Select a Time Period for the Class</div>
                <div id="noClass" className="initiallyHidden text-center alert alert-danger" role="alert">Enter a Class Name</div>
              </div>
              <div className="next-back">
                <button className="btn btn-link float-right" onClick={this.moveToNextStep}>Next Step</button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.createNewClass}>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={this.resetModal} data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
  
export default Dashboard;