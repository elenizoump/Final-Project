import React, { Component } from "react";
import { Link } from "react-router-dom";

import { list as listHomeworkService } from "./../services/homework";

class HomeworkListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeworks: []
    };
  }

  async componentDidMount() {
    try {
      const homeworks = await listHomeworkService();
      this.setState({
        homeworks
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate() {
    try {
      const homeworks = await listHomeworkService();
      this.setState({
        homeworks
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.props.user;
    return (
      <main>
        {this.state.homeworks.map(homework => {
          return (
            <div>
              <p>{homework.content}</p>
              <p>
                Attachements: <img src={homework.image} />
              </p>
            </div>
          );
        })}
      </main>
    );
  }
}

export default HomeworkListView;
