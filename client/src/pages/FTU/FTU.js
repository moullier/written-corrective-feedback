import React, { Component } from "react";
import "../../App.css";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";

class FTU extends Component {
  constructor(props) {
    super(props);

    this.state = {
        uid: null,
        institution: ""
    };
  }

    componentDidMount() {
        console.log('mounted');
        Axios.get("/api/user_data")
        .then((data) => {
            console.log(data);
            this.setState({uid: data.data.id});
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.institution);

        Axios.put("/api/update_user_inst/" + this.state.uid, {institution: this.state.institution})
        .then((data) => {
            console.log("data: ");
            console.log(data);
            this.props.history.push({
                pathname: '/dashboard',
                state: { id: this.state.uid }
            });
            window.location.reload();
        })
    }

    handleChange = (event) => {
        const value = event.target.value;
        console.log(event.target.name);
        
        this.setState({
        ...this.state,
        [event.target.name]: value
        });
    }

  render() {
    return (
        <div>
            <h1>User Setup</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputInst">Enter Your Institution Name</label>
                    <input 
                        onChange={this.handleChange}
                        type="text"
                        className="form-control"
                        name="institution"
                    />
                </div>
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <Link to={{
                    pathname: '/dashboard',
                    state: { id: this.state.uid }
                }}>Skip</Link>
            </form>
        </div>
    )
  }

}
  
export default FTU;