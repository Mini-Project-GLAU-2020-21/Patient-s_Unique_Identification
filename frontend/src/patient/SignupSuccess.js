import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';


const SignupSuccess = () => {

    return(
        <Base title="Account " description="" >
        <div className="card text-center border-success">
            <div className="card-header ">Account created successfully !!!</div>
            <div className="card-body text-success">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="/signin" className="btn btn-primary">SignIn</a>
            </div>
            
            {/*<div class="card-footer text-muted">
                2 days ago
            </div>*/}
        </div><br /><br /><br />
        </Base>
    );

};

export default SignupSuccess;