import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import renderMap from "./../../components/Map";

class TeacherProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [],
      toggleEditForm: false
    };
  }

  toggle() {
    this.setState({
      toggleEditForm: !this.state.toggleEditForm
    });
  }

  render() {
    const user = this.state.user;
    return (
      <div>
        {user && (
          <div>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="#" />
              <Card.Body>
                <Card.Title>
                  <p>{user.name}</p>
                  <p>{user.gender}</p>
                  <p>{user.age}</p>
                  <p>{user.adress}</p>
                  {this.state.user.levels.map(level => (
                    <p>
                      {level.levelsname} - {level.levesprice}
                    </p>
                  ))}
                </Card.Title>

                <Card.Text>{user.description}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        )}
        <div className="UsersMapLocation">{/* < renderMap /> */}</div>

        <button onClick={() => this.toggle()}>
          CLICK HERE TO SEE A POSSIBLE EDIT FORM ONCE ELENI GET IT
        </button>
        {this.state.toggleEditForm && (
          <form>
            <label htmlFor="">Edit me</label>
            <input type="text" value={user.name} />
          </form>
        )}

        {/* <Link to={`/${id}/edit`}>Edit Profile</Link> */}
      </div>
    );
  }
}

export default TeacherProfileView;
