import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Redirect, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  loadUser,
  signUpUser,
  signInUser,
  signOutUser
} from "./services/authentification.js";

import NoteListView from './views/NoteListView';
import NoteCreateView from './views/NoteCreateView';
import NoteEditView from './views/NoteEditView';
import NoteItemView from './views/NoteItemView';



import {
  listLessons
  // loadLesson,
  // editLesson,
  // removeLesson
} from "./services/lesson.js";

import { listTeachers } from "./services";

// student views
import ListOfTeachersView from "./views/Student/ListOfTeachersView";
// import PopUpView from "./views/Student/PopUpView";
import StudentLessonFormView from "./views/Student/StudentLessonFormView";
import StudentListOfLessonsView from "./views/Student/StudentListOfLessonsView";
import StudentProfileView from "./views/Student/StudentProfileView";
// import StudentProgressView from "./views/Student/StudentProgressView";
import StudentSingleLessonView from "./views/Student/StudentSingleLessonView";
import StudentSingleTeacherView from "./views/Student/StudentSingleTeacherView";
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
import ErrorView from './views/ErrorView'

import "./App.css";
import LessonWallView from "./views/LessonWallView";

import AddHomework from './views/HomeworkView';
import HomeworkListView from './views/HomeworkListView'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      lessons: [],
      teachers: [],
      userLoaded: false,
      lessonsLoaded: false,
      teachersLoaded: false
    };
    // this.changeAuthenticationStatus = this.changeAuthenticationStatus.bind(
    //   this
    // );
    // this.verifyAuthentication = this.verifyAuthentication.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchLessonData = this.fetchLessonData.bind(this);
    this.fetchTeacherData = this.fetchTeacherData.bind(this);
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchLessonData();
    this.fetchTeacherData();
  }

  async fetchUserData() {
    try {
      const response = await loadUser();
      if (response.statusText === "OK") {
        const { data } = response;
        this.setState({
          user: data,
          userLoaded: true
        });
      } else {
        this.setState({
          userLoaded: true
        });
        console.error(response);
      }
    } catch (error) {
      this.setState({
        userLoaded: true
      });
    }
  }

  async fetchLessonData() {
    try {
      const response = await listLessons();
      if (response.statusText === "OK") {
        const { data } = response;
        console.log(response);
        this.setState({
          lessons: data,
          lessonsLoaded: true,
          yesIWantToUseGoogleMapApiInternals: true
        });
      } else {
        this.setState({
          lessonsLoaded: true
        });
        console.error(response);
      }
    } catch (error) {
      this.setState({
        lessonsLoaded: true
      });
    }
  }

  async fetchTeacherData() {
    try {
      const response = await listTeachers();
      if (response.statusText === "OK") {
        const { data } = response;
        this.setState({
          teachers: data,
          teachersLoaded: true
        });
      } else {
        this.setState({
          teachersLoaded: true
        });
        console.error(response);
      }
    } catch (error) {
      this.setState({
        teachersLoaded: true
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
        this.fetchLessonData();
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
        this.fetchLessonData();
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
          user: null,
          lessons: []
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
      (this.state.userLoaded &&
        this.state.lessonsLoaded &&
        this.state.teachersLoaded && (
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
                  <Redirect exact="true" from="/" to="/lessons/view" />
                  <Redirect from="/sign-up" to="/profile" />
                  <Redirect from="/sign-in" to="/profile" />
                  <Route
                    exact
                    path="/teachers/view"
                    render={() => (
                      <ListOfTeachersView
                        user={this.state.user}
                        teachers={this.state.teachers}
                      />
                    )}
                  />
                  <Route
                    path="/teachers/:teacherId/view"
                    render={({
                      match: {
                        params: { teacherId }
                      }
                    }) => <StudentSingleTeacherView teacherId={teacherId} />}
                  />
                  <Route
                    path="/profile"
                    render={() =>
                      this.state.user.type === "teacher" ? (
                        <TeacherProfileView user={this.state.user} />
                      ) : (
                          <StudentProfileView
                            user={this.state.user}
                            onUpdateUser={this.fetchUserData}
                          />
                        )
                    }
                  />
                  <Route
                    path="/create"
                    // component={NoteCreateView}
                    render={props => <NoteCreateView {...props} />}
                    verify={this.verifyAuthentication}
                    redirect="/error/401"
                    user={this.state.user}
                  />
                  <Route
                    path="/lesson/:lessonId/view"
                    render={({
                      match: {
                        params: { lessonId }
                      }
                    }) =>
                      this.state.user.type === "teacher" ? (
                        <TeacherSingleLessonView
                          user={this.state.user}
                          lessonId={lessonId}
                        />
                      ) : (
                          <StudentSingleLessonView
                            user={this.state.user}
                            lessonId={lessonId}
                          />
                        )
                    }
                  />
                  <Route
                    path="/lessons/view"
                    render={() => (
                      <StudentListOfLessonsView
                        user={this.state.user}
                        lessons={this.state.lessons}
                      />
                    )}
                  />
                 <Route
                      path="/homework"
                      render={() =>
                        this.state.user.type === "teacher" ? (
                          <AddHomework user={this.state.user} />
                        ) : (
                            < ErrorView />
                          )
                      }
                    />
                  <Route
                    path="/lessons/create"
                    render={() => (
                      <StudentLessonFormView
                        user={this.state.user}
                        teachers={this.state.teachers}
                        fetchLessonData={this.fetchLessonData}
                      />
                    )}
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
                  {/* <Route
                  path="lesson/selectTeacher"
                  render={() => <ListOfTeachersView user={this.state.user} />}
                /> */}

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
                    <Route
                      path="/lesson-wall"
                      component={LessonWallView}
                    />

                    <Route
                      path="/list"
                      render={() => (
                        <NoteListView
                          user={this.state.user}/>
                          )}
                        />

                    <Route
                      path="/homeworkList"
                      render={() => (
                        <HomeworkListView
                          user={this.state.user}/>
                          )}
                        />

                        {/* // <Route path="/list" exact component={NoteListView} /> */}
                        <Route path="/:id/edit" component={NoteEditView} />
                        <Route path="/:id" component={NoteItemView} />
                        <Redirect to="/error/404" />

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
