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
          <Card.Body>
            <Card.Title>
              <p>{user.name}</p>
              <p>{user.gender}</p>
              <p>{user.age}</p>
              <p>{user.name}</p>
              <p>{user.adress}</p>
            </Card.Title>

            <Card.Text>{user.description}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <div className="UsersMapLocation">
          <p>Here goes the house location on the map</p>
        </div>
        <Link to={`/${user.name}/edit`}>Edit Profile</Link>
      </div>
    );
  }
}

export default StudentSingleLessonView;
