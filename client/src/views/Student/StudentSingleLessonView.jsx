import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loadLesson } from "./../../services/lesson";
import { withRouter } from "react-router-dom";
import './../../styles/studentSingleLessonStyles.scss'
class StudentSingleLessonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: null,
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
        const { data } = response;
        this.setState({
          lesson: data,
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
    const lesson = this.state.lesson;
    return this.state.loaded && this.state.lesson ? (
      <div className='main-div-container-student'>
        <div className="lesson-status-info">
          <h6> Bookend on {lesson.date}</h6>
          <h4> Current status {lesson.status}</h4>
        </div>

        <div className='location-box'>
          <h4>Location</h4>
          <p>{lesson._teacher.adress} Teacher Address</p>
        </div>

        <div className='lesson-info-box'>
          <h4>Teacher details</h4>
          <p>{lesson._teacher.name} Teacher Name</p>
          <p>{lesson._teacher.gender} Teacher Gender</p>
          <p>{lesson._teacher.age} Teacher Age</p>
          <p>{lesson._teacher.description} Teacher Description</p>
        </div>

        {/* <div className="_teacherMapLocation">
          <p>Here goes the house location on the map</p>
        </div> */}
        <div className='chat-bubble'>
        <Link to='/create'><ion-icon name="chatbubbles"></ion-icon></Link>
        </div>
      </div>
      
    ) : null;
  }
}

export default withRouter(StudentSingleLessonView);
