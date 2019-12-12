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

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;