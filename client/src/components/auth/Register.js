import React, { Component } from 'react'

class Register extends Component {
  
  state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
  }  

  inputChangeHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
  }
  onSubmit = (event) => {
      event.preventDefault();
      const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
      }
      console.log(newUser);
  }

  render() {
    return (
        <div className="register">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Register</h1>
                <p className="lead text-center">Create your DevConn account</p>
                <form >
                    <div className="form-group">
                    <input type="text" 
                    className="form-control form-control-lg" 
                    placeholder="Name"
                    value={this.state.name} 
                    onChange={this.inputChangeHandler}
                    name="name" />
                    </div>
                    <div className="form-group">
                    <input type="email" 
                    className="form-control form-control-lg" 
                    placeholder="Email Address"
                    value={this.state.email} 
                    onChange={this.inputChangeHandler}
                    name="email" />
                    </div>
                    <div className="form-group">
                    <input type="password" 
                    className="form-control form-control-lg"
                    placeholder="Password" 
                    value={this.state.password} 
                    onChange={this.inputChangeHandler}
                    name="password" />
                    </div>
                    <div className="form-group">
                    <input type="password" 
                    className="form-control form-control-lg" 
                    placeholder="Confirm Password" 
                    value={this.state.confirmPassword} 
                    onChange={this.inputChangeHandler}
                    name="confirmPassword" />
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
export default Register;