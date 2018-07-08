import React, { Component } from 'react'

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    }  
  
    inputChangeHandler = (event) => {
      this.setState({
          [event.target.name]: event.target.value
      });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(user);
    }
  render() {
    return (
        <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form>
                <div className="form-group">
                  <input type="email" 
                   className="form-control form-control-lg" 
                   placeholder="Email Address" 
                   onChange={this.inputChangeHandler}
                   value={this.state.email}
                   name="email" />
                </div>
                <div className="form-group">
                  <input type="password" 
                  className="form-control form-control-lg" 
                  placeholder="Password" 
                  onChange={this.inputChangeHandler}
                  value={this.state.password}
                  name="password" />
                </div>
                <input type="submit" onClick={this.onSubmit} className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Login;