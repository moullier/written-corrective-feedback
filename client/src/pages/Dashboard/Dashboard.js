import React, { Component } from "react";
import Axios from "axios";
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Dropdown from 'react-bootstrap/Dropdown';
import "../../App.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    console.log("uid is:");
    console.log(this.props.location.state.id);

    this.state = {
      uid: this.props.location.state.id,
      institution: "",
      classList: [],
      newClassName: "",
      newClassPeriod: "Select Class Period",
      existingCourseDropdown: "Select Existing Course",
      previousCourseList: [],
      successfulLoad: false
    };

    // ES6 React.Component doesn't auto bind methods to itself
    // Need to bind them manually in constructor
    this.selectTimeFrame = this.selectTimeFrame.bind(this);
    this.createNewClass = this.createNewClass.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.goToClassPage = this.goToClassPage.bind(this);
    this.selectCourse = this.selectCourse.bind(this);
    
  }

  componentDidMount() {
    Axios.get("/api/class_list/" + this.state.uid)
    .then((data) => {
      console.log(data.data);
      Axios.get("/api/course_list/" + this.state.uid)
      .then((course_data) => {
        console.log(course_data.data);

        this.setState({
          classList: data.data,
          previousCourseList: course_data.data,
          successfulLoad: true
        });
      })

    });
  }

  // In modal, check to see if new class name has been entered and time period
  // has been selected.  If so, add to database.
  createNewClass(e) {
    e.preventDefault();
    // console.log("attempt createNewClass");
    if(this.state.newClassName !== "") {
      if(this.state.newClassPeriod !== "Select Class Period") {
        console.log("add new class to database");
        Axios.post("/api/new_class/" + this.state.uid, {
          className: this.state.newClassName,
          classPeriod: this.state.newClassPeriod
        })
        .then((data) => {
          console.log(data);
          Axios.get("/api/class_list/" + this.state.uid)
          .then((result_data) => {
            console.log(result_data.data);
            this.setState({classList: result_data.data}, () => {
              $("#addClassModal").modal('hide')
            });
          });

        })
      } else {
        $("#noPeriod").show();
      }
    } else {
      $("#noClass").show();
    }
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

  handleChange(e) {
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

  selectCourse(e) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.id);
    $("#inputClassName").hide();
    $("#orSpan").hide();
    $("#inputClassLabel").hide();
    this.setState({existingCourseDropdown: e.target.id});
  }

  render() {
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
                <div>
                  <label htmlFor="dropdownCourses">Create New Section of Existing Course:</label>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdownCourses">
                    {this.state.existingCourseDropdown}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {this.state.previousCourseList.map((el, idx) => (
                        <Dropdown.Item id={el.name} key={idx} onClick={this.selectCourse}>{el.name}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                    <span id="orSpan">OR</span>
                </div>
                : ""}
                  <label id="inputClassLabel" htmlFor="inputClassName">Enter New Course Name</label>
                  <input
                    type="text" 
                    className="form-control mb-4"
                    id="inputClassName"
                    placeholder="Enter Class Name"
                    onChange={this.handleChange}
                  />
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {this.state.newClassPeriod}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <button className="dropdown-item" id="Spring 2020" type="button" onClick={this.selectTimeFrame}>Spring 2020</button>
                      <button className="dropdown-item" id="Summer 2020" type="button" onClick={this.selectTimeFrame}>Summer 2020</button>
                      <button className="dropdown-item" id="Fall 2020" type="button" onClick={this.selectTimeFrame}>Fall 2020</button>
                      <button className="dropdown-item" id="Academic Year 19-20" type="button" onClick={this.selectTimeFrame}>Academic Year 19-20</button>
                      <button className="dropdown-item" id="Academic Year 20-21" type="button" onClick={this.selectTimeFrame}>Academic Year 20-21</button>
                    </div>
                  </div>
                </div>
                <span id="noPeriod" className="initiallyHidden text-center">Select a Time Period for the Class</span>
                <span id="noClass" className="initiallyHidden text-center">Enter a Class Name</span>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.createNewClass}>Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
  
export default Dashboard;