import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class StudentProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruments: []
    };
  }

  render() {
    const user = this.props.user;
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
                  <p>{user.address}</p>
                  {this.state.instruments.map(instrument => (
                    <p>
                      {instrument.instrumentname} {instrument.level}
                    </p>
                  ))}
                </Card.Title>

                <Card.Text>{user.description}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
        {/* <div className="UsersMapLocation">
          <p>Here goes the house location on the map</p>
        </div> */}
        <Link to={`/lesson/create`}>Book a lesson</Link>
      </div>
    );
  }
}

export default StudentProfileView;
