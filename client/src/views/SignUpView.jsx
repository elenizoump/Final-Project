import React, { Component } from 'react';


class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      image:'',
      password: '',
      levels: '',
      gender: '',
      age:'',
      city:'',
      instruments:'',
      description: ''
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
    const { name, email, address, image, password, levels, gender, age, city, instruments, description} = this.state;
    try {
      const user = await SignUpView({ name, email, address, image, password, levels, gender, age, city, instruments, description});
      console.log(user);
      this.props.history.push(`/private`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <main>
        <form onSubmit={this.handleFormSubmission}>
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
            type="text"
            placeholder="address"
            value={this.state.address}
            name="address"
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
            type="levels"
            placeholder="levels"
            value={this.state.levels}
            name="levels"
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
          <input
            type="city"
            placeholder="city"
            value={this.state.city}
            name="city"
            onChange={this.handleInputChange}
          />
          <input
            type="instruments"
            placeholder="instruments"
            value={this.state.instruments}
            name="instruments"
            onChange={this.handleInputChange}
          />
          <input
            type="description"
            placeholder="description"
            value={this.state.description}
            name="description"
            onChange={this.handleInputChange}
          />
          <button>Sign Up</button>
        </form>
      </main>
    );
  }
}

export default SignUpView;