import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import * as Constants from "../constants";
import Collapsible from 'react-collapsible';
import Axios from "axios";


class DashboardClassList extends Component {
    
  
    constructor(props) {
      super(props);

      console.log(this.props);
      let tempList = this.props.classList;
      // console.log("tempList = " + tempList);

      let finalList = [];
      let classCount = 0;

      // creating empty arrays for each of the time periods
      for(let i = 0; i < Constants.TIME_PERIODS.length; i++) {
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
          classCount++;
        });
      });

      console.log(finalList);
      console.log("ClassCount in constructor is: " + classCount);


      this.state = {
        classList: finalList,
        toClassPageRedirect: false,
        classPageToLoad: null,
        classCount: classCount
      }

      this.goToClassPage = this.goToClassPage.bind(this);
    }

    componentDidUpdate() {

      // put some logic here
      Axios.get("/api/class_list/" + this.props.uid)
      .then((data) => {
        console.log(data.data);

        let tempList = data.data;
        let finalList = [];
        let classCount = 0;

        // creating empty arrays for each of the time periods
        for(let i = 0; i < Constants.TIME_PERIODS.length; i++) {
          finalList.push([]);
        }
  
        // iterate through classlist to put it in a format that's
        // easier to display on dashboard
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
            classCount++;
          });
        });
  
        console.log(finalList);
        console.log("ClassCount in componentDidUpdate is: " + classCount);
        console.log("this.state.classCount is: " + this.state.classCount);

        if(classCount !== this.state.classCount) {
          this.setState({classList: finalList});
        }


      })

    }

    goToClassPage(e) {
      console.log(e.target.courseid);

      this.setState({
        toClassPageRedirect: true,
        classPageToLoad: e.target.value,
        courseID: e.target.courseid
      })


    }


    render() {

      if (this.state.toClassPageRedirect) {
        return <Redirect to={{
          pathname: '/class',
          state: { uid: this.props.uid,
            classId: this.state.classPageToLoad,
            courseId: this.state.courseID
          }
        }} />
      }

        return (
          <div>
            {this.state.classList.map((el, index) => (
              el.length ? <div key={index}>

              <Collapsible trigger={el[0].time_period_name}>
                {el.map((cl, idx) => (
                  <div className="row my-2" key={idx}>
                    <div className="col-6">
                      {cl.courseName}
                    </div>
                    <div className="col-6">
                      <button className="btn btn-primary float-right"
                      value={cl.classID}
                      courseid={cl.courseID}
                      onClick={this.goToClassPage}
                      >Class Homepage</button>
                    </div>
                  </div>
                ))}
              </Collapsible>

              </div> : ""
            ))}
          </div>
        )
    }
}

export default DashboardClassList;