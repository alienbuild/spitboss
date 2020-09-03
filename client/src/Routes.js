import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import store from "./store";

// Routes
import Signin from './user/Signin'
import Signup from "./user/Signup";
import Forgot from "./user/Forgot";
import Reset from "./user/Reset";
import Spitbox from "./Components/Spitbox/spitbox"
import PrivateRoute from "./auth/PrivateRoute";

const Routes = () => {
    return (
        <Provider store={store} >
            <BrowserRouter>
                <Helmet titleTemplate="Spitboss.com">
                    <title>Spitboss</title>
                </Helmet>
                <Switch>
                    <Route path="/signin" exact component={Signin} />
                    <PrivateRoute path={`/spitbox`} exact component={Spitbox}  />
                    <Route path="/auth/password/forgot" exact component={Forgot} />
                    <Route path="/auth/password/reset/:token" exact component={Reset} />
                    <Route path="/signup" exact component={Signup} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default Routes;