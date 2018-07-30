import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import propTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import * as actions from "../../store/actions/auth";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {}
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props.onRegister(newUser, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>
              <p className="lead text-center">Create your DevConn account</p>
              <form>
                <TextFieldGroup
                  error={errors.name}
                  placeholder="Name"
                  onChange={this.inputChangeHandler}
                  value={this.state.name}
                  name="name"
                />

                <TextFieldGroup
                  type="email"
                  error={errors.email}
                  placeholder="Email Address"
                  onChange={this.inputChangeHandler}
                  value={this.state.email}
                  name="email"
                />
                <TextFieldGroup
                  type="password"
                  error={errors.password}
                  placeholder="Password"
                  onChange={this.inputChangeHandler}
                  value={this.state.password}
                  name="password"
                />

                <TextFieldGroup
                  type="password"
                  error={errors.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.inputChangeHandler}
                  value={this.state.confirmPassword}
                  name="confirmPassword"
                />
                <input
                  type="submit"
                  onClick={this.onSubmit}
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  onRegister: propTypes.func.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.error.errors
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRegister: (userData, history) =>
      dispatch(actions.registerUser(userData, history))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
