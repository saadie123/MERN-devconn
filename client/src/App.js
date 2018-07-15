import React, { Component } from 'react';
import {BrowserRouter as Router,Route, Redirect,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard';
import * as actions from './store/actions/auth';
import './App.css';

class App extends Component {
  state = {
    isAuthenticated: false
  }
  componentDidMount(){
    this.props.onAutoLogin();
  }
  render() {
    let routerLinks = (
      <Switch>
        <Route exact path='/' component={Landing}/> 
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Redirect to="/"/>
      </Switch>
    );
    if(this.props.isAuthenticated){
      routerLinks = (
        <Switch>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Redirect to='/dashboard' />
        </Switch>
      )
    }
    return (
      <Router>
        <div className="App">
          <Navbar />
          {routerLinks}
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: ()=>dispatch(actions.autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
