import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Redirect, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  loadUser,
  signUpUser,
  signInUser,
  signOutUser
} from "./services/authentification.js";

// import {
//   listLessons,
//   loadLesson,
//   editLesson,
//   removeLesson
// } from "./services/lesson.js";

// student views
import ListOfTeachersView from "./views/Student/ListOfTeachersView";
// import PopUpView from "./views/Student/PopUpView";
import StudentLessonFormView from "./views/Student/StudentLessonFormView";
import StudentListOfLessonsView from "./views/Student/StudentListOfLessonsView";
import StudentProfileView from "./views/Student/StudentProfileView";
// import StudentProgressView from "./views/Student/StudentProgressView";
// import StudentSingleLessonView from "./views/Student/StudentSingleLessonView";
//teacher views
// import TeacherCalendarView from "./views/Teacher/TeacherCalendarView";
// import TeacherListOfLessonsView from "./views/Teacher/TeacherListOfLessonsView";
// import TeacherListRequestedLessons from "./views/Teacher/TeacherListRequestedLessons";
import TeacherProfileView from "./views/Teacher/TeacherProfileView";
import TeacherSignUpView from "./views/Teacher/TeacherSignUpView";
import TeacherSingleLessonRequest from "./views/Teacher/TeacherSingleLessonRequest";
import TeacherSingleLessonView from "./views/Teacher/TeacherSingleLessonView";
//other
// import ErrorView from "./views/ErrorView";
// import LessonWallView from "./views/LessonWallView";
import SignInView from "./views/SignInView";
import StudentSignUpView from "./views/StudentSignUpView";
import Navbar from "./components/Navbar";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false
    };
    // this.changeAuthenticationStatus = this.changeAuthenticationStatus.bind(
    //   this
    // );
    // this.verifyAuthentication = this.verifyAuthentication.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  componentDidMount() {
    this.fetchUserData();
  }

  async fetchUserData() {
    try {
      const response = await loadUser();
      if (response.statusText === "OK") {
        const { data } = response;
        this.setState({
          user: data,
          loaded: true
        });
      } else {
        this.setState({
          loaded: true
        });
        console.error(response);
      }
    } catch (error) {
      this.setState({
        loaded: true
      });
    }
  }

  async onSignUp(data) {
    try {
      const response = await signUpUser(data);
      if (response.statusText === "OK") {
        const {
          data: { user }
        } = response;
        this.setState({
          user
        });
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async onSignIn(data) {
    try {
      const response = await signInUser(data);
      if (response.statusText === "OK") {
        const {
          data: { user }
        } = response;
        this.setState({
          user
        });
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async onSignOut() {
    try {
      const response = await signOutUser();
      if (response.statusText === "OK") {
        this.setState({
          user: null
        });
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // changeAuthenticationStatus(user) {
  //   this.setState({
  //     user
  //   });
  // }

  // verifyAuthentication() {
  //   return this.state.user;
  // }

  render() {
    return (
      (this.state.loaded && (
        <div className="App">
          <BrowserRouter>
            <Navbar user={this.state.user} onSignOut={this.onSignOut} />
            {/* <Fragment>
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
              <Link to="/sign-up-teacher">Become a Teacher</Link>
            </Fragment> */}
            {this.state.user ? (
              <Switch>
                {/* routes to forms */}

                {/* routes from forms to profiles */}
                {/* <Redirect from="/student" to="/lesson/create" /> */}
                <Redirect from="/sign-up/student" to="/student" />
                <Redirect from="/sign-up/teacher" to="/teacher" />
                <Redirect from="/sign-in" to={`/${this.state.user.type}`} />
                <Route
                  path="/teacher"
                  render={() => <TeacherProfileView user={this.state.user} />}
                />
                <Route
                  path="/student"
                  render={() => <StudentProfileView user={this.state.user} />}
                />
                {/* <Route
                  path="/:userType/:id"
                  render={props =>
                    props.match.params.userType === "teacher" ? (
                      <TeacherProfileView user={this.state.user} {...props} />
                    ) : (
                      <StudentProfileView user={this.state.user} {...props} />
                    )
                  }
                /> */}
                <Route
                  path="lesson/selectTeacher"
                  render={() => <ListOfTeachersView user={this.state.user} />}
                />
                <Route
                  path="/lesson/viewAllLessons"
                  render={() => (
                    <StudentListOfLessonsView user={this.state.user} />
                  )}
                />

                <Route
                  path="/lesson/create"
                  render={() => (
                    <StudentLessonFormView user={this.state.user} />
                  )}
                />
                {/* <Route
              path="/TeacherSingleLessonView"
              component={TeacherSingleLessonView}
            />
            <Route
              path="/StudentSingleLessonView"
              component={StudentSingleLessonView}
            /> */}

                {/* <ProtectedRoute
              path="/create"
              // component={NoteCreateView}
              render={props => <StudentLessonFormView {...props} />}
              verify={this.verifyAuthentication}
              redirect="/error/401"
            /> */}
              </Switch>
            ) : (
              <Switch>
                <Redirect exact="true" from="/" to="/sign-in" />
                <Route
                  path="/sign-in"
                  render={() => (
                    <SignInView
                      user={this.state.user}
                      onSignIn={this.onSignIn}
                    />
                  )}
                />
                <Route
                  path="/sign-up/student"
                  render={() => (
                    <StudentSignUpView
                      user={this.state.user}
                      onSignUp={this.onSignUp}
                    />
                  )}
                />
                <Route
                  path="/sign-up/teacher"
                  render={() => (
                    <TeacherSignUpView
                      user={this.state.user}
                      onSignUp={this.onSignUp}
                    />
                  )}
                />
              </Switch>
            )}
          </BrowserRouter>
        </div>
      )) ||
      null
    );
  }
}
export default App;
