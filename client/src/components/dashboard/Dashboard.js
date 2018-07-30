import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "./Spinner/Spinner";
import * as actions from "../../store/actions/profile";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent = null;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>Okie Dokie</h4>;
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateTopProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(actions.getCurrentProfile())
  };
};
export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(Dashboard);
