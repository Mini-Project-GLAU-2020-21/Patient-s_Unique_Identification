import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';


const SignupFailed = () => {

    return(
        <Base title="Account creation Failed" description="......" >
        <p className="text-dark text-center">Try again after some time. If problem persists, try with different email or contact number.</p>
    <Link to="/signup">Signup</Link>
        </Base>
    );

};

export default SignupFailed;