import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { load as loadLessonService } from "./../../services/lesson";

class TeacherSingleLessonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: null
    };
  }
  async componentDidMount() {
    const id = this.props.match.params.id;
    try {
      const lesson = await loadLessonService(id);
      this.setState({
        lesson
      });
    } catch (error) {
      console.log(error);
      this.props.history.push("/error/404");
    }
  }

  render() {
    const lesson = this.state.lesson;
    const id = this.props.match.params.id;
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={lesson._student.image} />
          <Card.Body>
            <Card.Title>
              <p>{lesson._student.name}</p>
              <p>{lesson._student.gender}</p>
              <p>{lesson._student.age}</p>
              <p>{lesson._student.name}</p>
              <p>{lesson._student.adress}</p>
              {this.state.lesson._student.instruments.map(instrument => (
                <p>
                  {instrument.instrumentname} - {instrument.level}
                </p>
              ))}
            </Card.Title>

            <Card.Text>{lesson._student.description}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <div className="lesson-info">
          <p>{lesson.date}</p>
          <p>{lesson.status}</p>
          <p>{lesson.status}</p>
        </div>
        <div className="_studentMapLocation">
          <p>Here goes the house location on the map</p>
        </div>
      </div>
    );
  }
}

export default TeacherSingleLessonView;
