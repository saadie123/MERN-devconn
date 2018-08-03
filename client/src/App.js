import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-experience/AddExperience";
import AddEducation from "./components/add-education/AddEducation";
import PrivateRoute from "./components/common/PrivateRoute";
import * as actions from "./store/actions/auth";
import "./App.css";

class App extends Component {
  state = {
    isAuthenticated: false
  };
  componentDidMount() {
    this.props.onAutoLogin();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Landing} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.autoLogin())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
