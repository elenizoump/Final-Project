import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
class NavbarComponent extends Component {
  render() {
    const user = this.props.user;
    return (
      <>
        {user ? (
          <Navbar sticky="bottom" bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link className="addLesson" as={Link} to="lessons/create">
                +
              </Nav.Link>
              <Nav.Link as={Link} to="/lessons/view">
                <img
                  src=""
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="allLesson"
                />
              </Nav.Link>
              <Nav.Link as={Link} to="/lessons/progress">
                <img
                  src=""
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="progress"
                />
              </Nav.Link>
              <Nav.Link as={Link} to="/create">
                <img
                  src=""
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="lessonWall"
                />
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                <img
                  src=""
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="profile"
                />
              </Nav.Link>
              <Button variant="outline-info" onClick={this.props.onSignOut}>
                Sign Out
              </Button>
            </Nav>
          </Navbar>
        ) : (
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="#home">
              <img
                alt="AppLogo"
                src=""
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              AppName
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/sign-in">
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} to="/sign-up/student">
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to="/sign-up/teacher">
                Become a Teacher
              </Nav.Link>
            </Nav>
          </Navbar>
        )}
      </>
    );
  }
}

export default NavbarComponent;
