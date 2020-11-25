import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';


const SignupSuccess = () => {

    return(
        <Base src1="../logo.png" title="Welcome to Patient's Unique Identification" description="Stay Safe, Stay Healthy" >
        <div className="card text-center border-success">
            <div className="card-header ">Account created successfully !!!</div>
            <div className="card-body text-success">
                <h5 className="card-title">You have successfully created your account on our system.</h5>
                <p className="card-text">Now, you can signin to your account.</p>
                <a href="/signin" className="btn btn-primary">SignIn</a>
            </div>
            
        </div><br /><br />
        </Base>
    );

};

export default SignupSuccess;