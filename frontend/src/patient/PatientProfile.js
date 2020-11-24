import React from 'react';
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from 'react-router-dom';

const PatientProfile = () => {


    const {
        patient: {f_name, l_name, email, p_contact_number, r_contact_number,gender, r_name, r_relation , address, blood_group, upi, dob , role}
    } = isAuthenticated();


    const patientSide = () => {
        return(

            <div className="card mb-1">
                <h2 className="card-header text-center">Patient Information</h2>
                <ul className="list-group">
                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                            UPI:
                        </span>{upi}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                            First Name:
                        </span>{f_name}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                            Last Name:
                        </span>{l_name}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                            Blood Group:
                        </span>{blood_group}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                           Date of Birth :
                        </span>{dob}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                           Gender :
                        </span>{gender}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                            Contact Number:
                        </span>{p_contact_number}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                            Email:
                        </span>{email}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                            Address:
                        </span>{address}</h4>
                    </li>





                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                            Relative Name:
                        </span>{r_name}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                            Rlation with relative:
                        </span>{r_relation}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4><span className="badge badge-info mr-4">
                            Relative Contact Number:
                        </span>{r_contact_number}</h4>
                    </li>
                    {/*<li className="list-group-item">
                        <span className="badge badge-danger">Patient Area</span>
                    </li>*/}
                </ul>
            </div>
        )
    }
    
    return(
        /*<Base title="My Profile" description="" >
            <p className="text-dark text-center"></p>
            <div className="col-7 ">
                {patientSide()}
            </div>
        </Base>*/


        <Base
        title="My Profile"
        description=""
        className="container  p-5"
      >
        <div className="row bg-light text-dark rounded">
          <div className="col-md-10 offset-md-1 px-5 py-5">
          {patientSide()}
          <div className="text-right"> 
                <button className="btn btn-outline-info mb-3">
                <Link style={{ textDecoration: 'none', color: "black" }} to="/patient/editProfile">Edit Profile</Link>
                </button>
            </div>
          </div>
        </div>
      </Base>
    );

};

export default PatientProfile;