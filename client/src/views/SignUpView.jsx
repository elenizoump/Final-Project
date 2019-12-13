import React, { Component } from 'react';


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
      const user = await SignUpView({ name, email, image, password, age, instruments, description, streetname, postcode, city, housenumber });
      console.log(user);
      this.props.history.push(`/private`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <main>
        <form action="/profile/{{user._id}}" method="POST" enctype="multipart/form-data" onSubmit={this.handleFormSubmission}>
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
            type="age"
            placeholder="age"
            value={this.state.age}
            name="age"
            onChange={this.handleInputChange}
          />
          <label htmlFor="instruments">Choose your instrument</label>
          <input
            type="instrumentname"
            placeholder="instrumentname"
            value={this.state.instrumentname}
            name="instrumentname"
            onChange={this.handleInputChange}
          />
          <input
            type="level"
            placeholder="level"
            value={this.state.level}
            name="level"
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

export default SignUpView;