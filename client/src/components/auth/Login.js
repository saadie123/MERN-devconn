import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import propTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import * as actions from "../../store/actions/auth";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.onLogin(user, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form>
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

Login.propTypes = {
  onLogin: propTypes.func.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.error.errors
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogin: (userData, history) =>
      dispatch(actions.loginUser(userData, history))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
