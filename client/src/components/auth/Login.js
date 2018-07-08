import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

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
        axios.post('/api/user/login', user).then(user=>{
          console.log(user);
        }).catch(err=>{
          this.setState({errors: err.response.data});
        });
    }
  render() {
    const {errors} = this.state;
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
                   className={classnames('form-control form-control-lg',{
                    'is-invalid': errors.email
                   })} 
                   placeholder="Email Address" 
                   onChange={this.inputChangeHandler}
                   value={this.state.email}
                   name="email" />
                    {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <input type="password" 
                  className={classnames('form-control form-control-lg',{
                    'is-invalid': errors.password
                  })}
                  placeholder="Password" 
                  onChange={this.inputChangeHandler}
                  value={this.state.password}
                  name="password" />
                  {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
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