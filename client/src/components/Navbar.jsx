import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { signOut as signOutService } from "./../services/authentification";
//import { load as loadUserService } from "./../services/authentification";

class Navbar extends Component {
  // async componentDidMount() {
  //   console.log("DID MOUNT");

  //   const id = this.props.match.params.id;
  //   try {
  //     const user = await loadUserService(id);
  //     this.setState({
  //       user
  //     });
  //   } catch (error) {
  //     this.props.history.push("/error/404");
  //   }
  // }

  // async onSignOutTrigger() {
  //   try {
  //     await signOutService();
  //     this.props.changeAuthenticationStatus(null);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  render() {
    const user = this.props.user;
    console.log("USER ON NAVBAR", this.props);
    return (
      <nav>
        {user ? (
          <>
            <Link className="addLesson" to="/lesson/create">
              +
            </Link>
            <Link className="allLesson" to="/lesson/viewAllLessons">
              <img src="" alt="lessons icon" />
              All Lessons
            </Link>
            <Link className="progress" to="/progress">
              <img src="" alt="progress icon" />
              Progress
            </Link>
            <Link className="lessonWall" to="/lessonWall">
              <img src="" alt="board icon" />
              Lesson Wall
            </Link>
            <Link className="profile" to={`/${user.type}`}>
              Profile
            </Link>
            <button onClick={this.props.onSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up/student">Sign Up</Link>
            <Link to="/sign-up/teacher">Become a Teacher</Link>
          </>
        )}
      </nav>
    );
  }
}

export default Navbar;
