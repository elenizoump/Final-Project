import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { load as loadUserService } from "./../../services/authentification";

class StudentProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      instruments: []
    };
  }
  async componentDidMount() {
    console.log('DID MOUNT',this.props.match.params.id);

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
    console.log("USER NO REACT", user);
    const id = this.props.match.params.id;
    return (
        
      <div>
        <Card style={{ width: "18rem" }}>
          {/* <Card.Img variant="top" src='#' /> */}
          <Card.Body>
            <Card.Title>
              {user && (<div>
                {user.name && <p>{user.name}</p>}
              {user.gender && <p>{user.gender}</p>}
              {user.age && <p>{user.age}</p>}
              {user.adress && <p>{user.adress}</p>}
              </div>)}
              
              
              {/* {this.state.user.instruments.map(instrument => (
                <p>
                  {instrument.instrumentname}  {instrument.level}
                </p>
              ))} */}
            </Card.Title>

            {/* <Card.Text>{user.description}</Card.Text> */}
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        {/* <div className="UsersMapLocation">
          <p>Here goes the house location on the map</p>
        </div> */}
        <Link to={`/${id}/edit`}>Edit Profile</Link>
      </div>
    );
  }
}

export default StudentProfileView;
