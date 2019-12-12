import React, { Component } from "react";

class SignInView extends Component {
  render() {
    return (
      <main>
        <form>
          <input
            type="text"
            placeholder="Username"
           
            name="text"
          />
          <input
            type="password"
            placeholder="Password"
          
            name="password"
          />
          <button>Sign In</button>
        </form>
      </main>
    );
  }
}

export default SignInView
