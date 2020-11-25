import React from 'react';
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from 'react-router-dom';
//var Mailto = require('react-mailto');

const ContactUs = () => {



    const contactDetails = () => {
        return(

            <div className="card mb-1 mr-2">
                <h1 className="card-header text-center">Contact Details</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <h2><span className="badge mr-4">
                            Contact Number: 
                        </span>+91-97XXXXXXXX</h2>
                    </li>
                    <li className="list-group-item">
                        <h2><span className="badge mr-4">
                            Email:
                        </span> <a class="mailto" href="mailto:abcdefg@test.com" style={{textDecoration:"none"}}>abcdefg@test.com</a></h2>
                    </li>
                    <li className="list-group-item">
                        <h2><span className="badge mr-4">
                            Address: 
                        </span>GLA University, Mathura, UP</h2>
                    </li>
                </ul>
            </div>
        )
    }
    
    return(
        <Base
        src1="./logo.png"
        title="How can you reach us ?"
        description=""
        className="container  p-5"
      >
        <div className="row bg-light text-dark rounded">
          <div className="col-md-10 offset-md-1 px-5 py-5">
          {contactDetails()}
          </div>
        </div>
      </Base>
    );

};

export default ContactUs;