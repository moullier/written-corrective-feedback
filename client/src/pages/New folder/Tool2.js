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
// import Tool1Step0 from "../../components/Tool1Step0";
// import Choices from "../../components/Choices";


class Tool2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tool2Exists: false
    }

  }

  componentDidMount() {
    console.log("Tool2 did mount");
  
  }

  render() {
    return (
        <div className="container">
          <h1>WCF Grading Checklist Tool – Stay Focused While Grading!</h1>
          <h2 className="mb-5">{this.state.assignmentTitle}</h2>
          {/* Step 0 here */}
        </div>
    )
  }
}
  
export default Tool2;