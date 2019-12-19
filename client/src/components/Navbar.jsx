import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import "./../styles/navbar.scss";
class NavbarComponent extends Component {
  render() {
    const user = this.props.user;
    return (
      <>
        {user ? (
          <Navbar bg="light" variant="light">
            <Nav className="mr-auto">
              <div id="Navbaricons">
                <Nav.Link as={Link} to="/lessons/view">
                  <img
                    id="navbaricons"
                    src="/images/home.png"
                    className="d-inline-block align-top"
                    alt="allLessons"
                  />
                </Nav.Link>
                <Nav.Link as={Link} to="/teachers/view">
                  <img
                    id="navbaricons"
                    src="/images/plus.png"
                    width="5"
                    height="5"
                    className="d-inline-block align-top"
                    alt="teacherList"
                  />
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  <img
                    id="navbaricons"
                    src="/images/navProfile.png"
                    className="d-inline-block align-top"
                    alt="profile"
                  />
                </Nav.Link>
              </div>
              <Button variant="outline-info" onClick={this.props.onSignOut}>
                Log Out
              </Button>
            </Nav>
          </Navbar>
        ) : (
          <Navbar bg="light" variant="light">
            <Navbar.Brand as={Link} to="#home">
              <img
                alt="AppLogo"
                src="/images/logo.png"
                width="5"
                height="5"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Nav fixed="bottom" className="mr-auto">
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
