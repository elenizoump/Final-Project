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
          <img
            src={studentData.image}
            alt="Profile"
            className="studentprofilePic"
          />
          <p>Student name: {studentData.name} </p>
          <p>Student location: {studentData.city} </p>
          <p>Description: {studentData.description} Student Description</p>
          <p>Student level: {studentData.levelsname}</p>
        </div>

        {studentData && (
          <div className="chat-bubble">
            <Link to={`/create/${studentData._id}`}>
              <ion-icon name="chatbubbles"></ion-icon>
            </Link>
          </div>
        )}
        {this.state.statusPeding && (
          <button onClick={this.statusChange}>Confirm Lesson</button>
        )}
      </div>
    ) : null;
  }
}

export default withRouter(TeacherSingleLessonView);
