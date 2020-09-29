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
import Spitbox from "./Components/Spitbox/Spitbox"
import PrivateRoute from "./auth/PrivateRoute";
import GetBoxes from "./Components/Boxes/GetBoxes";
import CreateBoxes from "./Components/Boxes/Create/CreateBoxes";

const Routes = () => {
    return (
        <Provider store={store} >
            <BrowserRouter>
                <Helmet titleTemplate="Spitboss.com">
                    <title>Spitboss</title>
                </Helmet>
                <Switch>

                    <PrivateRoute path={`/spitbox/spitboxes`} exact component={GetBoxes} />
                    <PrivateRoute path={`/spitbox/:id`} exact component={Spitbox} />

                    <Route path="/signup" exact component={Signup} />
                    <Route path="/signin" exact component={Signin} />

                    <Route path="/auth/password/forgot" exact component={Forgot} />
                    <Route path="/auth/password/reset/:token" exact component={Reset} />

                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default Routes;