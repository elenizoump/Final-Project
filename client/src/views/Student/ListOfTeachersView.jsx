import React, { Component } from "react";
import { listTeachers } from "./../../services/lesson";

class ListOfTeachersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    try {
      const users = await listTeachers();
      this.setState({
        users: users
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const teacherList = this.state.users;
    return (
      <div>
        <h1>List here:</h1>
        <ul>
          {teacherList.map(user => (
            <div key={user._id}>
              <li>{user.name}</li>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListOfTeachersView;
