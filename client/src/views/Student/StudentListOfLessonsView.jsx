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
        <div id="listOfLessonsGroup">
          <ListGroup className="overflow-auto">
            <h2>Upcoming Lessons</h2>
            <ul>
              {lessonList.map(lesson => (
                <ListGroup.Item key={lesson._id}>
                  <Link key={lesson._id} to={`/lesson/${lesson._id}/view`}>
                    <h4>
                      {lesson._teacher}
                      {lesson.instrument}
                      {lesson.hoursOfStudy}
                      {lesson.status}
                    </h4>
                  </Link>
                </ListGroup.Item>
              ))}
            </ul>
          </ListGroup>
        </div>
      </div>
    );
  }
}
