import React, { Component } from "react";


class DashboardClassList extends Component {
    
  
    constructor(props) {
      super(props);

      console.log(this.props);
    }


    render() {
        return <h4>Hello I am a list of classes</h4>
    }
}

export default DashboardClassList;