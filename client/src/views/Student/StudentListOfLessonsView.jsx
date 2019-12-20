import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../../styles/listoflessonsview.scss";
// import { listLessons as listService } from "./../../services/lesson.js";
import ListGroup from "react-bootstrap/ListGroup";
export default class StudentListOfLessonsView extends Component {
  render() {
    const lessonList = this.props.lessons;
    return (
      <div className="listOfLessons">
        <h2>Upcoming Lessons</h2>
        <div id="listOfLessonsGroup">
          <ListGroup className="overflow-auto">
            {lessonList.map(lesson => (
              <ListGroup.Item key={lesson._id}>
                <Link key={lesson._id} to={`/lesson/${lesson._id}/view`}>
                  <h4>Teacher: {lesson._teacher.name}</h4>
                  <h4>Instrument: {lesson.instrument}</h4>
                  <h4> Status: {lesson.status}</h4>
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }
}
