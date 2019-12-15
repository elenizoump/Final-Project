import React, { Component } from "react";
import { listLessons as listService } from "./../../services/lesson.js";

export default class StudentListOfLessonsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  async componentDidMount() {
    try {
      const list = await listService();
      this.setState({
        list: list
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const lessonList = this.state.list;
    return (
      <div>
        <h1>List here:</h1>
        <ul>
          {lessonList.map(lesson => (
            <div key={lesson._id}>
              <li>{lesson.instrument}</li>
              <li>{lesson.hoursOfStudy}</li>
              <li>{lesson.status}</li>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
