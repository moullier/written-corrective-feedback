import React, { Component } from "react";
import * as Constants from "../constants";


class DashboardClassList extends Component {
    
  
    constructor(props) {
      super(props);

      // console.log(this.props);
      let tempList = this.props.classList;
      // console.log("tempList = " + tempList);

      let finalList = [];

      // hard coding number of time periods here, may want to store in db and
      // do a call to get count later
      for(let i = 0; i < 5; i++) {
        finalList.push([]);
      }

      tempList.forEach(element => {
        let courseName = element.name;
        let courseID = element.id;
        element.ClassLists.forEach(cl => {
          // console.log(cl);
          let newClassObj = {
            courseName: courseName,
            courseID: courseID,
            time_period_name: cl.time_period_name,
            time_period_sort: cl.time_period_sort,
            classID: cl.id
          };
          console.log(cl.time_period_sort);
          finalList[cl.time_period_sort].push(newClassObj);
        });
      });

      console.log(finalList);


      this.state = {
        classList: finalList

      }
    }

    componentDidUpdate() {

      // put some logic here

    }


    render() {
        return (
          <div>Hello I am a list of classes
            {this.state.classList.map((el) => (
              el.length ? <div>
                <p><strong>{el[0].time_period_name}</strong></p>
                {el.map((cl) => (
                  <p>{cl.courseName}</p>
                ))}
              </div> : ""
            ))}


          </div>
        )
    }
}

export default DashboardClassList;