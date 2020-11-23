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
            <li className="nav-item" style={{fontSize:"25px"}}>
                <Link style={currentTab(history, "/")} className="nav-link" to="/">
                    Home 
                </Link>
            </li>
          {!isAuthenticated() && (
            <Fragment>
            <li className="nav-item" style={{fontSize:"25px"}}>
                <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">
                    Signup
                </Link>
            </li>
            <li className="nav-item" style={{fontSize:"25px"}}>
                <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">
                    Signin
                </Link>
            </li>
            </Fragment>
          )}
            {isAuthenticated() && (
              <Fragment>
                <li className="nav-item" style={{fontSize:"25px"}}>
                  <Link style={currentTab(history, "/patient/myProfile")} to="/patient/myProfile" className="nav-link">My Profile</Link>
                </li>
                <li className="nav-item" style={{fontSize:"25px"}}>
                    <Link style={currentTab(history, "/patient/myDocuments")} to="/patient/myDocuments" className="nav-link">My Documents</Link>
                </li>
                <li className="nav-item" style={{fontSize:"25px"}}>
                    <Link style={currentTab(history, "/patient/uploadDocuments")} to="/patient/uploadDocuments" className="nav-link">Upload Documents</Link>
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
        </ul>
      </div>
    );

export default withRouter(Menu);
