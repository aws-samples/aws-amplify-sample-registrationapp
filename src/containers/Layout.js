import React, {lazy, Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import routes from "../routes";

import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";

const Page404 = lazy(() => import("../pages/404"));

function Layout() {

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col flex-1 w-full">
                <Main>
                    <Suspense fallback={<ThemedSuspense/>}>
                        <Switch>
                            {routes.map((route, i) => {
                                return route.component ? (
                                    <Route
                                        key={i}
                                        exact={true}
                                        path={`/app${route.path}`}
                                        render={(props) => <route.component {...props} />}
                                    />
                                ) : null;
                            })}
                            <Redirect exact from="/app" to="/app/registration"/>
                            <Redirect exact from="/success" to="/app/success"/>
                            <Route component={Page404}/>
                        </Switch>
                    </Suspense>
                </Main>
            </div>
        </div>
    );
}

export default Layout;
