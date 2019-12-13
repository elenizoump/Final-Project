import React, { Component } from 'react';
import signUp from './../services/authentification';


class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      image: '',
      password: '',
      age: '',
      city: '',
      instrumentname: '',
      level:'',
      description: '',
      streetname: '',
      postcode: '',
      housenumber: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const { name, email, image, password, age, instruments, description, streetname, postcode, city, housenumber } = this.state;
    try {
      const user = await signUp(this.state);
      this.props.history.push(`/student/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <main>
        <form onSubmit={this.handleFormSubmission}>
          <input
            type="text"
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
          <input type="file" id="file" name="photo" />
          <button>Sign Up</button>
        </form>
      </main>
    );
  }
}

export default SignUpView;