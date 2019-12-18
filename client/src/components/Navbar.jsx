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
          <Navbar fixed="bottom" bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/lessons/view">
                <img
                  src="/images/home.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="allLessons"
                />
              </Nav.Link>
              <Nav.Link as={Link} to="/teachers/view">
                <img
                  src="/images/plus.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="teacherList"
                />
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                <img
                  src="/images/user (6).png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="profile"
                />
              </Nav.Link>
              <Button variant="outline-info" onClick={this.props.onSignOut}>
                Log Out
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
