import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';


const currentTab = (history, path) =>{
        if(history.location.pathname === path){
            return {color: "#000000", background:"#ffffff"}
        } else {
            return {color: "#ffffff"}
        }
}

const Menu = ({history}) => (

    <div  >
        <ul className="nav nav-tabs bg-info" >
            
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item" style={{fontSize:"25px"}}>
                <Link style={currentTab(history, "/")} className="nav-link" to="/">
                    Home 
                </Link>
            </li>
            <li className="nav-item" style={{fontSize:"25px"}}>
                <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">
                    Signin
                </Link>
            </li>
            <li className="nav-item" style={{fontSize:"25px"}}>
                <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">
                    Signup
                </Link>
            </li>
            <li className="nav-item" style={{fontSize:"25px"}}>
                <Link style={currentTab(history, "/guest/patient")} className="nav-link" to="/guest/patient">
                    Search using UPI
                </Link>
            </li>
            </Fragment>
          )}
           {isAuthenticated() && isAuthenticated().patient.role === 1 && (
             <Fragment>
               <li className="nav-item" style={{fontSize:"25px"}}>
                <Link style={currentTab(history, "/")} className="nav-link" to="/">
                    Home 
                </Link>
            </li>
               <li className="nav-item" style={{fontSize:"25px"}}>
                <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                    Admin Dashboard
                </Link>
            </li>
            <li className="nav-item" style={{fontSize:"25px"}}>
                <Link style={currentTab(history, "/admin/create/category")} className="nav-link" to="/admin/create/category">
                Create Category
                </Link>
            </li>
            <li className="nav-item" style={{fontSize:"25px"}}>
                  <Link className="nav-link text-white" onClick={() => { 
                    signout(() => { history.push("/"); });
                    }} to="/">
                    Signout
                  </Link>
                </li>
            
             </Fragment>
                
            )}
            {isAuthenticated() && isAuthenticated().patient.role === 0 && (
              <Fragment>
                <li className="nav-item" style={{fontSize:"25px"}}>
                  <Link style={currentTab(history, "/patient/dashboard")} to="/patient/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item" style={{fontSize:"25px"}}>
                  <Link style={currentTab(history, "/patient/myProfile")} to="/patient/myProfile" className="nav-link">My Profile</Link>
                </li>
                <li className="nav-item" style={{fontSize:"25px"}}>
                    <Link style={currentTab(history, "/patient/myDocuments")} to="/patient/myDocuments" className="nav-link">My Documents</Link>
                </li>
                <li className="nav-item" style={{fontSize:"25px"}}>
                    <Link style={currentTab(history, "/patient/uploadDocuments")} to="/patient/uploadDocuments" className="nav-link">Upload Document</Link>
                </li>
                <li className="nav-item" style={{fontSize:"25px"}}>
                  <Link className="nav-link text-white" onClick={() => { 
                    signout(() => { history.push("/"); });
                    }} to="/">
                    Signout
                  </Link>
                </li>
                <li className="nav-item" style={{fontSize:"25px"}}>
            <Link style={currentTab(history, "/ContactUs")} className="nav-link" to="/ContactUs">
              Contact Us
            </Link>
          </li>
              </Fragment>
          )}
         
          
        </ul>
      </div>
    );

export default withRouter(Menu);
