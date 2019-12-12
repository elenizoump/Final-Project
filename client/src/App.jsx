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
import SignUpView from "./views/SignUpView";

import "./App.css";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
  
          <Fragment>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
            <Link to='/sign-up-teacher' >Become a Teacher</Link>
          </Fragment>
        
      <Switch>
        <Route path="/sign-up" component={SignUpView} />
        <Route path="/sign-in" component={SignInView} />
        <Route path="/sign-up-teacher" component={TeacherSignUpView} />
      </Switch>
     
    </BrowserRouter>
     
    </div>
  );
}

export default App;
