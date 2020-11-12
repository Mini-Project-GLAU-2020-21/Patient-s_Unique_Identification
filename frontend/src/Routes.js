import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from './core/Home';
import Signin from './patient/Signin';
import Signup from './patient/Signup';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
            </Switch>
        </BrowserRouter>
    );
}


export default Routes;