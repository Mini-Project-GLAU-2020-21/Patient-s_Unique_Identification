import React from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";


const AdminDashBoard = () => {

    const {patient: {f_name, email, p_contact_number, role}} = isAuthenticated();      // destructuring

    const adminLeftSide =() => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link 
                        to="/admin/create/category"
                        className="nav-link text-success">
                            <h5>Create Categories</h5>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightSide =() => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ui className="list-group">
                    <li className="list-group-item">
                        <h4><span className="badge bg-info mr-2">Name:</span>{f_name}</h4>
                    </li>
                    <li className="list-group-item">
                    <h4><span className="badge bg-info  mr-2">Your Contact Number:</span>{p_contact_number}</h4>
                    </li>
                    <li className="list-group-item">
                    <h4><span className="badge bg-info  mr-2">Email:</span>{email}</h4>
                    </li>
                    
                </ui>
            </div>
        )
    }




    return(
        <Base src1="../logo.png"  title="Welcome to Admin area"
        description="Manage all of your categories here"
        className="container p-4"
        >
            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
            
        
        </Base>
    )
}


export default AdminDashBoard;