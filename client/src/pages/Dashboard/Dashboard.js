import React, { Component } from "react";
import "../../App.css";
import Axios from "axios";
import $ from "jquery";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    console.log("uid is:");
    console.log(this.props.location.state.id);

    this.state = {
      uid: this.props.location.state.id,
      institution: "",
      classList: []
    };
  }

  componentDidMount() {
    Axios.get("/api/class_list/" + this.state.uid)
    .then((data) => {
      console.log(data.data);
      // let classes = [];
      // data.data.forEach(c => {
      //   let classId = c.id;
      //   let className = c.name;
      //   let classPeriod = c.time_period;
      // })
      this.setState({classList: data.data});
    });
  }

  render() {
    let pageToRender = "";
    if(this.state.classList.length != 0) {
      pageToRender = <ul>
        {this.state.classList.map((classEl) => (
        <li>{classEl.name}</li>
      ))}
      </ul>;
    } else {
      pageToRender = <div><h4>No Classes Created Yet</h4>
        <h6>Enter a Class to Create Assignments</h6>
        <img className="mb-4" src={"../../../assets/images/check.png"} alt="checkmark icon" width="72" height="72" />
      </div>
    }
    return (
      <div>
        {pageToRender}
      </div>
    )
  }

}
  
export default Dashboard;