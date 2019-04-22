import React, { Component } from "react";
import "../App.css";
import Header from "./Header";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Typography from "@material-ui/core/Typography";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPass: false
    };
  }

  toggle() {
    const { showPass } = this.state;

    this.setState({
      showPass: !showPass
    });
  }

  render() {
    const { updateText, showLogin } = this.props;
    const { showPass } = this.state;
    return (
      <div>
        <Header />
        <div className="mainDiv">
          <FormControl className="formDiv" color="blue">
            <Typography variant="display2">Sign Up</Typography>
            <br />
            {/**email field */}
            <TextField
              className="formElement"
              id="input-with-icon-grid"
              label="Email"
              type="email"
              placeholder="hello@world.com"
              onChange={updateText}
              name="userEmail"
              margin="normal"
            />

            {/**password field */}
            <TextField
              className="formElement"
              id="input-with-icon-grid"
              label="Password"
              type={showPass ? "text" : "password"}
              onChange={updateText}
              name="userPassword"
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.toggle.bind(this)}
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <br />
            <br />
            {/**Signup button */}
            <Button
              className="formElement"
              variant="contained"
              color="primary"
              onClick={showLogin}
            >
              Sign up
            </Button>
            <br />
            <br />

            <Typography variant="body2">Already have an account</Typography>
            {/**login button */}
            <Button
              className="formElement"
              variant="contained"
              color="secondary"
              onClick={showLogin}
            >
              Login
            </Button>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default Signup;
