import React, { Component } from "react";
import "../../App.css";
import Axios from "axios";
import $ from "jquery";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    console.log(event.target.name);
    
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("attempt to create account");

    Axios.post("/api/signup", {
      email: this.state.email,
      password: this.state.password
    })
    .then((data) => {
      console.log("data: ");
      console.log(data);
      Axios.post("/api/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then((res) => {
        let firstTime = data.data.ftu;
        console.log(firstTime);
        // if user is a first time user, push to FTU page, otherwise to dashboard
        if(firstTime) {
          this.props.history.push("/ftu");
          window.location.reload();
        } else {
          this.props.history.push("/dashboard");
          window.location.reload();
        }
      })
    })
    .catch(function(err) {
      console.log("Error");
      console.log(err);
      $("#li-error").show().html("<strong>Error:</strong> Incorrect email or password");
      // alert(err.message);
    });
  }

  render() {
      return (
        <div className="text-center">
        <form className="form-signup" onSubmit={this.handleSubmit}>
          <img className="mb-4" src="http://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Please create account</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Enter Email address" required autoFocus onChange={this.handleChange}/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Enter Password" required onChange={this.handleChange}/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" name="password_confirm" id="confirmPassword" className="form-control" placeholder="Confirm Password" required onChange={this.handleChange}/>
          <button className="btn btn-lg btn-primary btn-block" type="submit" >Create Account</button>
          <p id="li-error"></p>
          <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
        </form>
        </div>
      );
    }
  }
  
  export default Signup;