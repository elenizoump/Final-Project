import React, { Component } from "react";
import { Link } from "react-router-dom";

import { listLessons as listService } from "./../../services/lesson.js";

export default class StudentListOfLessonsView extends Component {
  render() {
    const lessonList = this.props.lessons;
    return (
      <div>
        <h1>List here:</h1>
        <ul>
          {lessonList.map(lesson => (
            <Link key={lesson._id} to={`/lesson/${lesson._id}/view`}>
              <li>Instrunment:{lesson.instrument}</li>
              <li>{lesson.hoursOfStudy}</li>
              <li>Status: {lesson.status}</li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}
