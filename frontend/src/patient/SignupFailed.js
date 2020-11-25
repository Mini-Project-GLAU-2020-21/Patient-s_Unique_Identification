import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';


const SignupFailed = () => {

    return(
        <Base src1="../logo.png" title="Account creation Failed" description="" >
        <div className="card text-center border-success">
            <div className="card-header ">Account created unsuccessfull !!!</div>
            <div className="card-body text-danger">
                <h5 className="card-title">Something went wrong.</h5>
                <p className="text-dark text-center">Try again after some time. If problem persists, try with different email or contact number.</p>
                <a href="/signup" className="btn btn-primary">Try to SignUp Again</a>
            </div>
            
        </div>
        
        <br /><br />
        
        
        </Base>
    );

};

export default SignupFailed;