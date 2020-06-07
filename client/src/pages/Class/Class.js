import React, { Component } from "react";
import "../../App.css";
import "./index.css";
import Axios from "axios";
import $ from "jquery";

class Class extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.location.state);

    this.state = {
      uid: this.props.location.state.uid,
      classId: this.props.location.state.classId,
      classTitle: "",
      assignmentList: [],
      newAssignmentTitle: "",
      newAssignmentDescription: ""
    }

    this.goToAssnPage = this.goToAssnPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createNewAssignment = this.createNewAssignment.bind(this);
  }

  // when component mounts, pull the class and assignment info from the database
  componentDidMount () {
    Axios.get("/api/class_name/" + this.state.classId)
    .then(nameData => {
      console.log(nameData.data);
      let cName = nameData.data.name;

      Axios.get("/api/assignment_list/" + this.state.classId)
      .then(assListData => {
        console.log(assListData.data);
        let assnList = assListData.data;

        this.setState({
          classTitle: cName,
          assignmentList: assnList
         })
      })
    })
  }

  // attempting to create new assignment based on data in the modal
  createNewAssignment(e) {
    e.preventDefault();
    console.log("attempt to create new");

    // if a title has been entered
    if(this.state.newAssignmentTitle !== "") {
      console.log("add new assignment to database");

      Axios.post("/api/new_assignment/" + this.state.classId, {
        assnTitle: this.state.newAssignmentTitle,
        assnDescription: this.state.newAssignmentDescription
      })
      .then((data) => {
        console.log(data);
        Axios.get("/api/assignment_list/" + this.state.classId)
        .then((result_data) => {
          console.log(result_data.data);
          this.setState({assignmentList: result_data.data}, () => {
            $("#addAssnModal").modal('hide')
          });
        });
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      $("#noTitle").show();
    }
  }


  handleChange(e) {
    e.preventDefault();

    this.setState({[e.target.name]: e.target.value});
  }

  // redirect to assignment page, passing it the necessary props
  goToAssnPage(e) {
    let assId = parseInt(e.target.value);

    this.props.history.push({
      pathname: '/assignment',
      state: { 
        uid: this.state.uid,
        classId: this.state.classId,
        classTitle: this.state.classTitle,
        assignmentId: assId,
        assignmentTitle: e.target.title
       }
     });
    window.location.reload();
  }

  render() {

    let addAssnModal = <div className="modal" id="addAssnModal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Assignment</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.clearNewClass}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="inputAssnTitle">Assignment Title</label>
            <input
              type="text" 
              className="form-control mb-4"
              id="inputAssnTitle"
              name="newAssignmentTitle"
              placeholder="Enter Assignment Title"
              onChange={this.handleChange}
            />
            <label htmlFor="inputAssnDesc">Assignment Description</label>
            <input
              type="textarea"
              className="form-control mb-4"
              id="inputAssnDesc"
              name="newAssignmentDescription"
              placeholder="Enter Assignment Description"
              onChange={this.handleChange}
            />
          </div>
          <span id="noTitle" className="initiallyHidden text-center">Enter an Assignment Title</span>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={this.createNewAssignment}>Save changes</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>;

    return (
        <div>
          <h3>{this.state.classTitle}</h3>
          <h3>Assignments:</h3>
          {this.state.assignmentList.map((el, index) => (
                  <div className="row mb-2" key={index}>
                  <div className="col-6">{el.name}</div>
                  <div className="col-6">
                    <button 
                    value={el.id}
                    title={el.name}
                    className="btn btn-primary"
                    onClick={this.goToAssnPage}
                    >
                      Assignment Hub
                    </button>
                  </div>
                </div>
          ))}
          <button className="btn btn-secondary btn-lg" data-toggle="modal" data-target="#addAssnModal">Create New Assignment</button>
          {addAssnModal}
        </div>
    )
  }

}
  
export default Class;