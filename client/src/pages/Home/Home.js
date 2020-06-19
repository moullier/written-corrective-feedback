import React, { Component } from "react";
import "../../App.css";
import "./Home.css";
import video from "./mp4/bg.mp4";

class Home extends Component {

  constructor(props) {
    super(props);

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
  }

  // load login page
  onLoginClick() {
    this.props.history.push({
      pathname: '/login'
    });
    window.location.reload();
  }

  // load signup page
  onSignupClick() {
    this.props.history.push({
      pathname: "/signup"
    });
  }

  render() {
      return (
        <div className="Home">
          <div className="overlay"></div>
          <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
            <source src={video} type="video/mp4" />
          </video>

        <div className="masthead">
          <div className="masthead-bg"></div>
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-12 my-auto">
                <div className="masthead-content text-white py-5 py-md-0">
                  <h1 className="mb-3">WCF Workbook</h1>
                  <p className="mb-5">Providing written corrective feedback in the second language classroom</p>
                  <div className="input-group input-group-newsletter">
                      <button className="btn btn-secondary mr-5" type="button" onClick={this.onLoginClick}>Login</button>
                      <button className="btn btn-secondary" type="button" onClick={this.onSignupClick}>Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="social-icons">
          <ul className="list-unstyled text-center mb-0">
            <li className="list-unstyled-item">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-unstyled-item">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="list-unstyled-item">
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>

        </div>
      );
    }
  }
  
  export default Home;