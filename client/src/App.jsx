import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

// student views
import ListOfTeachersView from "./views/Student/ListOfTeachersView";
import PopUpView from "./views/Student/PopUpView";
import StudentLessonFormView from "./views/Student/StudentLessonFormView";
import StudentListOfLessonsView from "./views/Student/StudentListOfLessonsView";
import StudentProfileView from "./views/Student/StudentProfileView";
import StudentProgressView from "./views/Student/StudentProgressView";
import StudentSignUpView from "./views/Student/StudentSignUpView";
import StudentSingleLessoView from "./views/Student/StudentSingleLessoView";
//teacher views
import TeacherCalendarView from "./views/Teacher/TeacherCalendarView";
import TeacherListOfLessons from "./views/Teacher/TeacherListOfLessons";
import TeacherListRequestedLessons from "./views/Teacher/TeacherListRequestedLessons";
import TeacherProfileView from "./views/Teacher/TeacherProfileView";
import TeacherSignUpView from "./views/Teacher/TeacherSignUpView";
import TeacherSingleLessonRequest from "./views/Teacher/TeacherSingleLessonRequest";
//other
import ErrorView from "./views/ErrorView";
import LessonWallView from "./views/LessonWallView";
import SignInView from "./views/SignInView";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Fragment>
          <Link to="/logIn">Log In</Link>
          <Link to="/register">Register</Link>
        </Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
