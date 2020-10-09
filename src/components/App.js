import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./Layout/Layout";
import HomePage from "../Pages/HomePage/HomePage";

import routes from "../routes";
import Loader from "./Loader/Loader";

const MoviesPageComponent = lazy(() =>
  import("../Pages/MoviesPage/MoviesPage" /* webpackChunkName: "MoviesPage" */)
);
const MovieDetailsPageComponent = lazy(() =>
  import(
    "../Pages/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetails" */
  )
);
// const ErrorPageComponent = lazy(() =>
//   import("../Pages/Error/Error" /* webpackChunkName: "Error" */)
// );

export default function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path={routes.HomePage} exact component={HomePage} />
            <Route
              path={routes.MovieDetailsPage}
              component={MovieDetailsPageComponent}
            />
            <Route path={routes.MoviesPage} component={MoviesPageComponent} />
            {/* <Route path={routes.Error} component={ErrorPageComponent} /> */}
            <Redirect to={routes.HomePage} />
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
}
