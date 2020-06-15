import React, { Component } from "react";
import "../../App.css";
import "./Home.css";
import video from "./mp4/bg.mp4";

class Home extends Component {

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
                  <h1 className="mb-3">Coming Soon!</h1>
                  <p className="mb-5">We're working hard to finish the development of this site. Our target launch date is
                    <strong>January 2019</strong>! Sign up for updates using the form below!</p>
                  <div className="input-group input-group-newsletter">
                    <input type="email" className="form-control" placeholder="Enter email..." aria-label="Enter email..." aria-describedby="basic-addon" />
                    <div className="input-group-append">
                      <button className="btn btn-secondary" type="button">Notify Me!</button>
                    </div>
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