import React, { Component } from "react";

class SignInView extends Component {
  // constructor


  // handleChange


  // handleSubmit
  
  render() {
    return (
      <main>
        <form>
          <input
            type="text"
            placeholder="Email"
            name="text"
            onChange
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
          />
          <button onClick>Sign In</button>
        </form>
      </main>
    );
  }
}

export default SignInView
