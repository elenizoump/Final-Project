import React, { Component } from "react";

class StudentSignUpView extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   name: "",
    //   email: "",
    //   image: "",
    //   password: "",
    //   age: "",
    //   city: "",
    //   instrumentname: "",
    //   level: "",
    //   description: "",
    //   streetname: "",
    //   postcode: "",
    //   housenumber: ""
    // };
    this.state = {
      nameValue: "",
      emailValue: "",
      passwordValue: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [`${name}Value`]: value
    });
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    // const {
    //   name,
    //   email,
    //   image,
    //   password,
    //   age,
    //   instruments,
    //   description,
    //   streetname,
    //   postcode,
    //   city,
    //   housenumber
    // } = this.state;
    const {
      nameValue: name,
      emailValue: email,
      passwordValue: password
    } = this.state;
    this.props.onSignUp({ name, email, password, type: "student" });
  }

  render() {
    return (
      <main>
        <form onSubmit={this.handleFormSubmission} enctype="multipart/form-data">
          <input
            type="text"
            placeholder="Insert your Full Name"
            value={this.state.nameValue}
            name="name"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Insert your Email"
            value={this.state.emailValue}
            name="email"
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            placeholder="Use a strong Password"
            value={this.state.passwordValue}
            name="password"
            onChange={this.handleInputChange}
          />
          <input type="file" id="file"  name="photo" />
           <button class="btn btn-success custom-file-control">Upload</button>
          {/* These can be added in the profile edit */}
          {/* <input
            type="number"
            placeholder="age"
            value={this.state.age}
            name="age"
            onChange={this.handleInputChange}
          />
          <label htmlFor="instruments">Choose your instrument</label>
          <input
            type="text"
            placeholder="instrumentname"
            value={this.state.instrumentname}
            name="instrumentname"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="level"
            value={this.state.level}
            name="level"
            onChange={this.handleInputChange}
          />
          <label htmlFor="address">Address</label>

          <input
            type="text"
            placeholder="streetname"
            value={this.state.streetname}
            name="streetname"
            onChange={this.handleInputChange}
          />
          <input
            type="number"
            placeholder="housenumber"
            value={this.state.housenumber}
            name="housenumber"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="postcode"
            value={this.state.postcode}
            name="postcode"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="city"
            value={this.state.city}
            name="city"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="description"
            value={this.state.description}
            name="description"
            onChange={this.handleInputChange}
          />
          <input type="file" id="file" name="photo" /> */}
          <button type="submit">Sign Up</button>
        </form>
      </main>
    );
  }
}

export default StudentSignUpView;
