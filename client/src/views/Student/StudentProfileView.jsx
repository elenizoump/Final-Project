import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { load as loadUserService } from "./../../services/authentification";

class StudentProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      levels: []
    };
  }
  async componentDidMount() {
    const id = this.props.match.params.id;
    try {
      const user = await loadUserService(id);
      
      this.setState({
        user
      });
    } catch (error) {
      
      this.props.history.push("/error/404");
    }
  }

  render() {
    const user = this.state.user;
      console.log(user)
    const id = this.props.match.params.id;
    return (
      <form action="/profile/:_id">
        
      <div>
        <Card style={{ width: "18rem" }}>
          {/* <Card.Img variant="top" src='#' /> */}
          <Card.Body>
            <Card.Title>
              <p>{user.name}</p>
              <p>{user.gender}</p>
              <p>{user.age}</p>
              <p>{user.adress}</p>
              {this.state.user.instruments.map(instrument => (
                <p>
                  {instrument.instrumentname}  {instrument.level}
                </p>
              ))}
            </Card.Title>

            <Card.Text>{user.description}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        {/* <div className="UsersMapLocation">
          <p>Here goes the house location on the map</p>
        </div> */}
        <Link to={`/${id}/edit`}>Edit Profile</Link>
      </div>
      </form>
    );
  }
}

export default StudentProfileView;
