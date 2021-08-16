import React from "react";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { ConfigLayout } from "../layouts/ConfigLayout";
import LoginPage from "../pages/LoginPage";
import TestPage from "../pages/TestPage";
import { PublicRoute } from "./PublicRoute";
import routesDictionary from "./routesDict";
import { GlobalSnackbar } from "../components/GlobalSnackbar";
import RegisterPage from "../pages/RegisterPage";
import AnimalControlPage from "../pages/AnimalControlPage";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <GlobalSnackbar></GlobalSnackbar>
        <Switch>
          <PublicRoute
            component={LoginPage}
            layout={AuthLayout}
            path={routesDictionary.login}
            isAuthenticated={false}
          />
          <PublicRoute
            component={RegisterPage}
            layout={AuthLayout}
            path={routesDictionary.register}
            isAuthenticated={false}
          />
          <PublicRoute
            component={TestPage}
            layout={ConfigLayout}
            path={routesDictionary.test}
            isAuthenticated={false}
          />
          <PublicRoute
            component={() => <p>Probando</p>}
            layout={ConfigLayout}
            path={routesDictionary.test1}
            isAuthenticated={false}
          />
          <PublicRoute
            component={AnimalControlPage}
            layout={DashboardLayout}
            path={routesDictionary.animalControl}
            isAuthenticated={false}
          />
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};
