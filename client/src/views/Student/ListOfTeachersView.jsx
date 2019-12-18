import React, { Component } from "react";
import { listTeachers } from "./../../services/lesson";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import "./../../styles/listofteachersview.scss";

export default class ListOfTeachersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instrumentName: "",
      level: ""
    };
    this.onInstrumentNameChange = this.onInstrumentNameChange.bind(this);
    this.onLevelChange = this.onLevelChange.bind(this);
  }

  onInstrumentNameChange(event) {
    this.setState({
      instrumentName: event.target.value
    });
  }

  onLevelChange(event) {
    this.setState({
      level: event.target.value
    });
  }

  render() {
    const teachers = this.props.teachers;
    return (
      <main className="listofteachers">
        {/* <h1>List here:</h1> */}
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>
              <h5>Instrument</h5>
            </Form.Label>
            <Form.Control
              as="select"
              type="text"
              placeholder="instrument"
              value={this.state.instrumentName}
              name="instrument"
              onChange={this.onInstrumentNameChange}
            >
              <option value="">Filter By Instument</option>
              {[
                "Piano",
                "Guitar",
                "Violin",
                "Drums",
                "Saxophone",
                "Flute",
                "Clarinet",
                "Cello",
                "Vocals"
              ].map(instrumentName => (
                <option key={instrumentName} value={instrumentName}>
                  {instrumentName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>
              <h5>Level</h5>
            </Form.Label>
            <Form.Control
              as="select"
              type="text"
              placeholder="level"
              value={this.state.level}
              name="level"
              onChange={this.onLevelChange}
            >
              <option value="">Filter By Level</option>
              {["Beginner", "Intermediate", "Advanced"].map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <h5>Teachers:</h5>
          <hr />
          <ListGroup>
            {teachers
              .filter(
                teacher =>
                  ((!this.state.instrumentName && true) ||
                    teacher.instrumentname === this.state.instrumentName) &&
                  ((!this.state.level && true) ||
                    teacher.levelsname === this.state.level)
              )
              .sort(
                (teacher1, teacher2) =>
                  teacher2.popularity - teacher1.popularity
              )
              .map(teacher => (
                <ListGroup.Item>
                  <Link key={teacher._id} to={`/teachers/${teacher._id}/view`}>
                    <h4>
                      {teacher.name} {teacher.popularity}
                    </h4>
                  </Link>
                </ListGroup.Item>
              ))}
          </ListGroup>
          {/* <Link to={`/teachers/view`}>View all Teachers</Link> */}
        </Form>
      </main>
    );
  }
}

// class ListOfTeachersView extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       users: []
//     };
//   }

//   async componentDidMount() {
//     try {
//       const users = await listTeachers();
//       this.setState({
//         users: users
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   render() {
//     const teacherList = this.state.users;
//     return (
//       <div>
//         <h1>List here:</h1>
//         <ul>
//           {teacherList.map(user => (
//             <div key={user._id}>
//               <li>{user.name}</li>
//             </div>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default ListOfTeachersView;
