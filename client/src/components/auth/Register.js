import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

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
      axios.post('/api/user/register',newUser).then(response=>{
          console.log(response.data);
      }).catch(err=>{
          this.setState({errors:err.response.data});
      });
  }

  render() {
      const {errors} = this.state;
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
                    className={classnames('form-control form-control-lg',{
                        'is-invalid': errors.name
                    })} 
                    placeholder="Name"
                    value={this.state.name} 
                    onChange={this.inputChangeHandler}
                    name="name" />
                    {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}    
                    </div>
                    <div className="form-group">
                    <input type="email" 
                    className={classnames('form-control form-control-lg',{
                        'is-invalid': errors.email
                    })} 
                    placeholder="Email Address"
                    value={this.state.email} 
                    onChange={this.inputChangeHandler}
                    name="email" />
                    {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                    <input type="password" 
                    className={classnames('form-control form-control-lg',{
                        'is-invalid': errors.password
                    })}
                    placeholder="Password" 
                    value={this.state.password} 
                    onChange={this.inputChangeHandler}
                    name="password" />
                    {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                    <input type="password" 
                    className={classnames('form-control form-control-lg',{
                        'is-invalid': errors.confirmPassword
                    })}
                    placeholder="Confirm Password" 
                    value={this.state.confirmPassword} 
                    onChange={this.inputChangeHandler}
                    name="confirmPassword" />
                    {errors.confirmPassword && (<div className='invalid-feedback'>{errors.confirmPassword}</div>)}
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