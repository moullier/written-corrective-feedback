import React, { Component } from "react";
import "../../App.css";
import Axios from "axios";
import $ from "jquery";

class Assignment extends Component {
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
      assignmentDescription: ""
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.goToTool = this.goToTool.bind(this);
  }


  componentDidMount () {
    Axios.get("/api/assignment/" + this.state.assignmentId)
    .then(data => {
      console.log(data.data.description);

      this.setState({assignmentDescription: data.data.description})
    })
  }

  goToTool () {
    this.props.history.push({
      pathname: '/tool1',
      state: { 
        uid: this.state.uid,
        classId: this.state.classId,
        classTitle: this.state.classTitle,
        assignmentId: this.state.assignmentId,
        assignmentTitle: this.state.assignmentTitle
       }
     });
    window.location.reload();
  }


  render() {
    return (
        <div>
          <h1>{this.state.assignmentTitle}</h1>
          <h3>{this.state.classTitle}</h3>
          <p>{this.state.assignmentDescription}</p>
          <button className="btn btn-primary btn-lg mx-1" onClick={this.goToTool}>Worksheet 1</button>
          <button className="btn btn-primary btn-lg mx-1">Worksheet 2</button>
          <button className="btn btn-primary btn-lg mx-1">Worksheet 3</button>
        </div>
    )
  }

}
  
export default Assignment;