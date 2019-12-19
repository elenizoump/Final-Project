import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loadLesson, updateStatus } from "./../../services/lesson";
import { withRouter } from "react-router-dom";
import "./../../styles/teacherSingleLessonStyles.scss";

class TeacherSingleLessonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: null,
      studentData: null,
      teacherData: null,
      loaded: false,
      //status: "Pending",
      statusPeding: true
    };
    this.statusChange = this.statusChange.bind(this);
  }

  componentDidMount() {
    this.fetchLesson(this.props.lessonId);
  }

  async fetchLesson() {
    const id = this.props.lessonId;
    try {
      const response = await loadLesson(id);
      if (response.statusText === "OK") {
        const {
          data: { lesson, studentData, teacherData }
        } = response;
        this.setState({
          lesson,
          studentData,
          teacherData,
          loaded: true
        });
      } else {
        this.setState({
          loaded: true
        });
        console.error(response);
      }
    } catch (error) {
      this.setState({
        loaded: true
      });
      console.log(error);
    }
  }

  async statusChange() {
    try {
      const response = await updateStatus(this.props.lessonId);
      if (response.statusText === "OK") {
        this.fetchLesson(this.props.lessonId);
        this.setState({
          statusPeding: false
        });
      } else {
        console.error(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // async submitChangedStatus() {
  //   try {
  //     const response = await updateStatus({
  //       status: this.state.status
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  render() {
    const { lesson, studentData } = this.state;
    return this.state.loaded && this.state.lesson ? (
      <div className="main-div-container">
        <div className="lesson-status-info">
          <h6> Bookend on {lesson.date}</h6>
          <h4> Current status {lesson.status}</h4>
        </div>
        <div className="lesson-info-box">
          <h4>Student details</h4>
          <p>{studentData.name} Student Name</p>
          <p>{studentData.gender} Student Gender</p>
          <p>{studentData.age} Student Age</p>
          <p>{studentData.adress} Student Address</p>
          <p>{studentData.description} Student Description</p>
          <p>
            {studentData.levelsname} {studentData.levelsprice}
          </p>
        </div>
        {this.state.statusPeding && (
          <button onClick={this.statusChange}>Confirm Lesson</button>
        )}
        {/* <div className="_teacherMapLocation">
          <p>Here goes the house location on the map</p>
        </div> */}
        <div className="chat-bubble">
          <Link to="/create">
            <ion-icon name="chatbubbles"></ion-icon>
          </Link>
        </div>
      </div>
    ) : null;
  }
}

export default withRouter(TeacherSingleLessonView);
