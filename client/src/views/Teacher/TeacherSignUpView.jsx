import React, { Component } from "react";

class TeacherSignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      image: '',
      password: '',
      levelsname: '',
      levelsprice:'',
      gender: '',
      age: '',
      city: '',
      description: '',
      streetname: '',
      postcode: '',
      housenumber: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  async handleFormSubmission(event) {
    event.preventDefault();
<<<<<<< HEAD
    const { name, email, image, password, levelsname, levelsprice, gender, age, description, streetname, postcode, city, housenumber } = this.state;
    try {
      const user = await TeacherSignUpView({ name, email, image, password, levelsname, levelsprice, gender, age, description, streetname, postcode, city, housenumber });
=======
    const {
      name,
      email,
      address,
      image,
      password,
      levels,
      gender,
      age,
      city,
      description
    } = this.state;
    try {
      const user = await TeacherSignUpView({
        name,
        email,
        address,
        image,
        password,
        levels,
        gender,
        age,
        city,
        description
      });
>>>>>>> bbf0b50017c97293439928fc9dbc3b5f7baa4c02
      console.log(user);
      this.props.history.push(`/${name}`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <main>
        <form action='/TeacherProfileView' method='POST' onSubmit={this.handleFormSubmission} >
          <input
            type="name"
            placeholder="name"
            value={this.state.name}
            name="name"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="email"
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            placeholder="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
          />
           <input
            type="gender"
            placeholder="gender"
            value={this.state.gender}
            name="gender"
            onChange={this.handleInputChange}
          />
          <input
            type="age"
            placeholder="age"
            value={this.state.age}
            name="age"
            onChange={this.handleInputChange}
          />
          <label htmlFor="Levels">Price according to level</label>
          <input
            type="levelsname"
            placeholder="levelsname"
            value={this.state.levelsname}
            name="levelsname"
            onChange={this.handleInputChange}
          />
          <input
            type="levelsprice"
            placeholder="levelsprice"
            value={this.state.levelsprice}
            name="levelsprice"
            onChange={this.handleInputChange}
          />
         

          <label htmlFor="address">Address</label>

          <input
            type="streetname"
            placeholder="streetname"
            value={this.state.streetname}
            name="streetname"
            onChange={this.handleInputChange}
          />
          <input
            type="housenumber"
            placeholder="housenumber"
            value={this.state.housenumber}
            name="housenumber"
            onChange={this.handleInputChange}
          />
          <input
            type="postcode"
            placeholder="postcode"
            value={this.state.postcode}
            name="postcode"
            onChange={this.handleInputChange}
          />
          <input
            type="city"
            placeholder="city"
            value={this.state.city}
            name="city"
            onChange={this.handleInputChange}
          />
          <input
            type="description"
            placeholder="description"
            value={this.state.description}
            name="description"
            onChange={this.handleInputChange}
          />
          <input type="file" id="file" name="photo" />
          <button>Sign Up</button>
        </form>
      </main>
    );
  }
}

export default TeacherSignUpView;
