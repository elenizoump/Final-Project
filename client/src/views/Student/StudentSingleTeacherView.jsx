import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loadTeacher } from "./../../services";
import { withRouter } from "react-router-dom";
import "./../../styles/singleTeacherView.scss";
import defaultImg from "./../../images/profileDefault.png";

class StudentSingleTeacherView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: null,
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchTeacher(this.props.teacherId);
  }

  async fetchTeacher() {
    const id = this.props.teacherId;
    try {
      const response = await loadTeacher(id);
      if (response.statusText === "OK") {
        const { data } = response;
        this.setState({
          teacher: data,
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
    const teacher = this.state.teacher;
    return this.state.loaded && this.state.teacher ? (
      <div className="singleTeacherView">
        <h1>{teacher.name}</h1>
        <img src={teacher.image} alt="Profile" className="profilePic" />
        <div id="teacherInfo">
          <h3>Teacher Information</h3>
          <p>{teacher.instrumentname}</p>
          <p>{teacher.levelsname}</p>
          <p>{teacher.levelsprice}€/Hour</p>
          <p>{teacher.city}</p>
          <p className="teacherDescription">{teacher.description}</p>
        </div>

        <Link to={`/teachers/${this.props.match.params.teacherId}/book`}>
          Book a lesson
        </Link>
      </div>
    ) : null;
  }
}

export default withRouter(StudentSingleTeacherView);
