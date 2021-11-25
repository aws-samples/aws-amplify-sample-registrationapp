import React, {lazy} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";

const Layout = lazy(() => import("./containers/Layout"));

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/app" component={Layout}/>
                    <Redirect exact from="/" to="/app"/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
