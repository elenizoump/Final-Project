import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loadLesson } from "./../../services/lesson";
import { withRouter } from "react-router-dom";
import "./../../styles/studentSingleLessonStyles.scss";
import GoogleApiWrapper from "./../../components/Map";
class StudentSingleLessonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: null,
      studentData: null,
      teacherData: null,
      loaded: false
    };
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

  render() {
    const { lesson, teacherData } = this.state;
    return this.state.loaded && this.state.lesson ? (
      <div className="main-div-container-student">
        <div className="lesson-status-info">
          <h6> Booked on {lesson.date}</h6>
          <h4> Current status {lesson.status}</h4>
          <Button onClick={this.fetchLesson(this.props.lessonId)}>
            Refresh Lesson Status
          </Button>
        </div>
        <div className="lesson-info-box">
          <h4>Teacher details</h4>
          <img
            src={teacherData.image}
            alt="Profile"
            className="studentprofilePic"
          />
          <p>Teacher name: {teacherData.name} </p>
          <p>Teacher location: {teacherData.city} </p>
          <p>Description: {teacherData.description} Student Description</p>
          <p>Teacher teaching level: {teacherData.levelsname}</p>
          <p>Price per hour: {teacherData.levelsprice}‎€</p>
        </div>
        {teacherData && (
          <div className="chat-bubble">
            <Link to={`/create/${teacherData._id}`}>
              <ion-icon name="chatbubbles"></ion-icon>
            </Link>
          </div>
        )}
      </div>
    ) : null;
  }
}

export default withRouter(StudentSingleLessonView);
