import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Base from '../core/Base';

import {signin, authenticate, isAuthenticated} from "../auth/helper"

const Signin = () => {

    const [values, setValues] = useState({
        email: "abhinav@yahoo.com",
        password: "12345",
        error: "",
        loading: false,
        didRedirect: false
    })

    const {email, password, error, loading, didRedirect} = values;

    const {patient} = isAuthenticated();

    const handleChange = field_name => event => {
        setValues({...values, error: false, [field_name]: event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect: true
                    });
                });
            }
        })
        .catch(() => {
            console.log("Sign In request failed")})
    }

    const performRedirect = () => {

        //TODO: do a redirect here
        if(didRedirect){
            if(didRedirect){
                if(patient && patient.role === 0){
                    return <Redirect to="/patient/dashboard" />
                } else {
                    return <p>redirect to admin dashboard</p>
                }
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
          loading && (
              <div className="alert alert-info">
                  <h2>Loading...</h2>
              </div>
          )
        );
      };
    
      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
      };
    


    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-dark">Email</label>
                            <input onChange={handleChange("email")} value={email} className="form-control" type="email"/>
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Password</label>
                            <input onChange={handleChange("password")} value={password} className="form-control" type="password"/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">
                            Submit
                        </button>
                        <p>
                            <br/>
                            <br/>
                        </p>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base title="Sign In to your Account" description="Continue to PUI" >
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
        </Base>
    );
};

export default Signin;
