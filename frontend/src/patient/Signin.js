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
    const onReset = () => {
        document.getElementById("signinform").reset();
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
                <div className="col-md-5 offset-sm-4 text-left">
                <div className="card">
                        <div className="card-header bg-dark text-white text-center"><h1>Signin Form</h1></div>
                    <div className="card-body ml-3 mr-3">
                        
                    <form id="signinform" autoComplete="off">
                        <div className="form-group">
                            <h4><label className="text-dark">Email:</label></h4>
                            <input onChange={handleChange("email")} value={email} className="form-control" type="email"/>
                        </div><br/>
                        <div className="form-group">
                        <h4><label className="text-dark">Password</label></h4>
                            <input onChange={handleChange("password")} value={password} className="form-control" type="password"/>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-3">
                                <button onClick={onReset} className="btn btn-danger btn-block"> Reset </button>
                            </div>
                            <div className="col-3"></div>
                            <div className="col-3"></div>
                            <div className="col-3">
                                <button onClick={onSubmit} className="btn btn-success btn-block"> Submit </button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
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
