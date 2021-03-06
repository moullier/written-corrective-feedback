import React, { Component } from "react";
import Axios from "axios";
// import "../../App.css";
import "./Login.css";
import $ from "jquery";

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
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
    console.log("attempt login");

    Axios.post("/api/login", {
      email: this.state.email,
      password: this.state.password
    })
    .then((data) => {
      console.log("data: ");
      let firstTime = data.data.ftu;
      console.log(firstTime);
      // if user is a first time user, push to FTU page, otherwise to dashboard
      if(firstTime) {
        this.props.history.push("/ftu");
        window.location.reload();
      } else {
        this.props.history.push({
          pathname: '/dashboard',
          state: { id: data.data.id }
        });
        window.location.reload();
      }
    })
    .catch(function(err) {
      console.log("Error");
      console.log(err);
      $("#li-error").show().html("<strong>Error:</strong> Incorrect email or password");
    });
  }

  render() {
      return (
        <div className="Login text-center">
          <form className="Login-form" onSubmit={this.handleSubmit}>
            <img className="mb-4" src={"../../../assets/images/check.png"} alt="checkmark icon" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange={this.handleChange}/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={this.handleChange}/>
            <button className="btn btn-lg btn-primary btn-block" id="loginBtn" type="submit" >Sign in</button>
            <p id="li-error"></p>
            <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
          </form>
        </div>
      );
    }
  }
  
  export default Login;