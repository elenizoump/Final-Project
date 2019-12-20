import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../../styles/listoflessonsview.scss";
// import { listLessons as listService } from "./../../services/lesson.js";
import ListGroup from "react-bootstrap/ListGroup";
export default class StudentListOfLessonsView extends Component {
  render() {
    const lessonList = this.props.lessons;
    const teacher = this.props.teacherData;
    return (
      <div className="listOfLessons">
        <h2>Upcoming Lessons</h2>
        <div id="listOfLessonsGroup">
          <ListGroup className="overflow-auto">
            {lessonList.map(lesson => (
              <ListGroup.Item key={lesson._id}>
                <Link key={lesson._id} to={`/lesson/${lesson._id}/view`}>
                  <p>Instrument: {lesson.instrument}</p>
                  <p> Status: {lesson.status}</p>
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }
}
