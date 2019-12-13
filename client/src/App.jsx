import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { load as loadUserInformationService } from "./services/authentification.js";

// student views
import ListOfTeachersView from "./views/Student/ListOfTeachersView";
import PopUpView from "./views/Student/PopUpView";
import StudentLessonFormView from "./views/Student/StudentLessonFormView";
import StudentListOfLessonsView from "./views/Student/StudentListOfLessonsView";
import StudentProfileView from "./views/Student/StudentProfileView";
import StudentProgressView from "./views/Student/StudentProgressView";
import StudentSignUpView from "./views/Student/StudentSignUpView";
import StudentSingleLessonView from "./views/Student/StudentSingleLessonView";
//teacher views
import TeacherCalendarView from "./views/Teacher/TeacherCalendarView";
import TeacherListOfLessonsView from "./views/Teacher/TeacherListOfLessonsView";
import TeacherListRequestedLessons from "./views/Teacher/TeacherListRequestedLessons";
import TeacherProfileView from "./views/Teacher/TeacherProfileView";
import TeacherSignUpView from "./views/Teacher/TeacherSignUpView";
import TeacherSingleLessonRequest from "./views/Teacher/TeacherSingleLessonRequest";
//other
import ErrorView from "./views/ErrorView";
import LessonWallView from "./views/LessonWallView";
import SignInView from "./views/SignInView";
import SignUpView from "./views/SignUpView";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false
    };
    this.changeAuthenticationStatus = this.changeAuthenticationStatus.bind(
      this
    );
    this.verifyAuthentication = this.verifyAuthentication.bind(this);
  }

  async componentDidMount() {
    try {
      const user = await loadUserInformationService();
      this.setState({
        user,
        loaded: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  changeAuthenticationStatus(user) {
    this.setState({
      user
    });
  }

  verifyAuthentication() {
    return this.state.user;
  }

  render() {
    const user = this.state.user;
    return (
      <div className="App">
        <BrowserRouter>
          <Fragment>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-up-teacher">Become a Teacher</Link>
          </Fragment>

          <Switch>
            <Route path="/lesson/create" component={StudentLessonFormView} />
            <Route path="/lesson/list" component={StudentListOfLessonsView} />
            <Route path="/sign-up" component={SignUpView} />
            <Route path="/student/:id" component={StudentProfileView} />
            <Route path="/sign-in" component={SignInView} />
            <Route path="/sign-up-teacher" component={TeacherSignUpView} />
            {/* <ProtectedRoute
              path="/create"
              // component={NoteCreateView}
              render={props => <StudentLessonFormView {...props} />}
              verify={this.verifyAuthentication}
              redirect="/error/401"
            /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
