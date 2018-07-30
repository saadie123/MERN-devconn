import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import propTypes from "prop-types";
import * as actions from "../../store/actions/auth";

class Navbar extends Component {
  logout = () => {
    this.props.onLogout(this.props.history);
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    let navItems = null;
    if (!isAuthenticated) {
      navItems = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    } else {
      navItems = (
        <ul
          className="navbar-nav ml-auto align-items-center"
          style={{ display: "flex" }}
        >
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center" to="/profile">
              <img
                src={user.avatar}
                className="rounded-circle"
                alt="user avatar"
                style={{ width: "30px", marginRight: "5px" }}
              />
              <span>{user.name}</span>
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="javascript:void"
              onClick={this.logout}
            >
              Logout
            </a>
          </li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link
            className="navbar-brand"
            to={isAuthenticated ? "/dashboard" : "/"}
          >
            DevHood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {navItems}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: history => dispatch(actions.logoutUser(history))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
