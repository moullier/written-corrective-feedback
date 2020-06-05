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
      assignmentList: []
    }
  }

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

  goToAssnPage(e) {
    console.log(e.target.value);
  }

  render() {
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
                    className="btn btn-primary"
                    onClick={this.goToAssnPage}
                    >
                      Assignment Hub
                    </button>
                  </div>
                </div>
          ))}
          <button className="btn btn-primary btn-lg mx-1">Create New Assignment</button>
        </div>
    )
  }

}
  
export default Class;