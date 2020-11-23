import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from './core/Home';
import Signin from './patient/Signin';
import Signup from './patient/Signup';
import SignupFailed from './patient/SignupFailed';
import SignupSuccess from './patient/SignupSuccess';
import PatientDashboard from './patient/PatientDashboard';
import PrivateRoute from './auth/helper/PrivateRoutes';
import PatientProfile from './patient/PatientProfile';
import UploadDocument  from './patient/UploadDocument';
import PatientDocuments from './patient/PatientDocuments';
import PatientSearchByGuest from './core/PatientSearchByGuest';
import EditProfile from './patient/EditProfile';



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/SignupSuccess" exact component={SignupSuccess} />
                <Route path="/SignupFailed" exact component={SignupFailed} />
                <Route path="/guest/patient" exact component={PatientSearchByGuest} />
                <PrivateRoute path="/patient/dashboard" exact component={PatientDashboard} />
                <PrivateRoute path="/patient/myProfile" exact component={PatientProfile} />
                <PrivateRoute path="/patient/editProfile" exact component={EditProfile} />
                <PrivateRoute path="/patient/uploadDocuments" exact component={UploadDocument} />
                <PrivateRoute path="/patient/myDocuments" exact component={PatientDocuments} />
 
            </Switch>
        </BrowserRouter>
    );
}


export default Routes;