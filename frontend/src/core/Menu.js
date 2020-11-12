import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';


const currentTab = (history, path) =>{
        if(history.location.pathname === path){
            return {color: "#3d263e"}
        } else {
            return {color: "#d1d1d1"}
        }
}

const Menu = ({history}) => (
    <div  >
        <ul className="nav nav-tabs bg-info">
            <li className="nav-item">
                <Link style={currentTab(history, "/")} className="nav-link" to="/">
                    Home 
                </Link>
            </li>
          {!isAuthenticated() && (
            <Fragment>
            <li className="nav-item">
                <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">
                    Signup
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">
                    Signin
                </Link>
            </li>
            </Fragment>
          )}
            {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}

        </ul>
    </div>
);

export default withRouter(Menu);
