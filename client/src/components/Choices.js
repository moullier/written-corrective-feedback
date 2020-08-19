import React, {Component} from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from "jquery";

class Choices extends Component {

constructor(props) {
    super(props);
  
    this.state = {
      newChoice: "",
      listOfChoices: props.initialChoices,
      selectedChoices: [],
      initialToggleComplete: false
    }
  
    this.toggleSelection = this.toggleSelection.bind(this);
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
    this.addChoice = this.addChoice.bind(this);
  
  }

  componentDidMount() {
    console.log(this.props.initialChoices);
    console.log(this.props.selectedChoices);
  }

  componentDidUpdate() {
    console.log(this.props.initialChoices);
    console.log(this.props.selectedChoices);

    if(this.props.selectedChoices && !this.state.initialToggleComplete) {
      this.toggleList();
    }

  }

  toggleList() {

    // for(let i = 0; i < this.props.initialChoices.length; i++) {
    //   console.log("initialChoices index = " + i);
    //   console.log("element:");
    //   console.log(this.props.initialChoices[i]);
    // }

    // for(let i = 0; i < this.props.selectedChoices.length; i++) {
    //   console.log("selectedChoices index = " + i);
    //   console.log("element:");
    //   console.log(this.props.selectedChoices[i]);
    // }

    console.log("**************");
    console.log("Hopefully running this only one time, with an array of choices");

    let arrayOfIndices = [];
    let currentList = this.state.listOfChoices;

    this.props.selectedChoices.forEach(element => {
      console.log(element);

      // check to see if selected choice is in the initial list
      let index = currentList.indexOf(element);
     
      if(index !== -1) {
        arrayOfIndices.push(index);
      } else {
        // need to add this item to the current list
        currentList.push(element);
        index = this.state.listOfChoices.indexOf(element);
        arrayOfIndices.push(index);
      }
    });

    console.log(arrayOfIndices);

    this.setState({
      initialToggleComplete: true,
      listOfChoices: currentList,
      selectedChoices: this.props.selectedChoices
    }, () => {
      arrayOfIndices.forEach(element => {
        if(element >= 0) {
          let selector = "#div" + element;
          console.log(selector);
          $(selector).addClass("border border-primary");
        }
      });
    });
  }
  
  toggleSelection(e) {
    console.log(e.target.value);
  
    if($("#" + e.target.id).hasClass("border border-primary")) {
      $("#" + e.target.id).removeClass("border border-primary");
      let newChoices = this.state.selectedChoices;
      const index = newChoices.indexOf(e.currentTarget.getAttribute('value'));
      if (index > -1) {
        newChoices.splice(index, 1);
      }
      this.setState({selectedChoices: newChoices}, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.selectedChoices);
        }
      });
    } else {
      $("#" + e.target.id).addClass("border border-primary");
      let newChoices = this.state.selectedChoices;
      console.log(e.target);
      console.log(e.currentTarget.getAttribute('value') );
      newChoices.push(e.currentTarget.getAttribute('value'));
      this.setState({selectedChoices: newChoices}, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.selectedChoices);
        }
      });
    }
  }
  
    handleChoiceChange(e) {
      console.log(e.target.value);
  
      this.setState({newChoice: e.target.value});
    }
  
    addChoice() {
      if(this.state.newChoice.length > 0) {
        let choices = this.state.listOfChoices;
        let selected = this.state.selectedChoices;
        choices.push(this.state.newChoice);
        selected.push(this.state.newChoice);
        $("#inputChoiceName").val("");
  
        this.setState({
          listOfChoices: choices,
          selectedChoices: selected,
          newChoice: ""
        }, () => {
          const num = this.state.listOfChoices.length - 1;
          $("#div" + num).addClass("border border-primary");
          if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.selectedChoices);
          }
        })
      }
    }
  
    render() {

      let currentlySelected = this.props.selectedChoices ? <div id="displaySelectedDiv">
        <strong>Selected {this.props.choiceName}:</strong>
        <ul>
          {this.props.selectedChoices.map((element, index) => (
        <li>{element}</li>
      ))}
      </ul>
      </div> : "";

    return (
      <div className="container">
          {currentlySelected}
        <div className="row  d-flex justify-content-center">
          {this.state.listOfChoices.map((element, index) => (
            <div className="col-12 col-sm-4 shadow-sm p-3 m-2 bg-white rounded contentDiv" key={index} value={element} id={"div" + index} onClick={this.toggleSelection}>
              {element}
            </div>
          ))}
          <div className="col-12 col-sm-4 shadow-sm p-3 m-2 bg-white rounded" id="addChoiceDiv">
            <label className="mt-3" id="inputClassLabel" htmlFor="inputChoiceName">Enter other choice</label>
            <input
              type="text" 
              className="form-control mb-4"
              id="inputChoiceName"
              placeholder="Enter New Choice"
              onChange={this.handleChoiceChange}
            />
            <button className="btn btn-primary" onClick={this.addChoice}>Add New Choice</button>
          </div>
        </div>
      </div>
  )}
}

export default Choices;
