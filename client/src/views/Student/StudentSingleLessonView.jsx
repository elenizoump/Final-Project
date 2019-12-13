import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { load as loadLessonService } from "./../../services/lesson";

class StudentSingleLessonView extends Component {
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
          <Card.Img variant="top" src={user.image} />
          <Card.Body>
            <Card.Title>
              <p>{_teacher.name}</p>
              <p>{_teacher.gender}</p>
              <p>{_teacher.age}</p>
              <p>{_teacher.name}</p>
              <p>{_teacher.adress}</p>
              {this.state._teacher.levels.map(level => (
                <p>
                  {level.name} - {level.price}
                </p>
              ))}
            </Card.Title>

            <Card.Text>{_teacher.description}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <div className="_teacherMapLocation">
          <p>Here goes the house location on the map</p>
        </div>
      </div>
    );
  }
}

export default StudentSingleLessonView;
