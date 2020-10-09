import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import routes from "../../routes";
import API from "../../API/fetchApi";
import checkState from "../../utils/checkState";
import ErrorPage from "../Error/Error";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import styles from "./MovieDetailsPage.module.css";

export default class MovieDetailsPage extends Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
  };
  state = { movie: null, error: false };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    API.fetchById(movieId)
      .then((response) => {
        this.setState({ movie: response, error: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  prevPage = () => {
    const { state } = this.props.location;
    const { history } = this.props;

    if (state && state.from) {
      history.push(state.from);
      return;
    }
    history.push(routes.MoviesPage);
  };

  render() {
    const { movie, error } = this.state;
    return (
      <>
        {!error && movie && (
          <>
            <button
              type="button"
              className={styles.btn}
              onClick={this.prevPage}
            >
              Back
            </button>
            <section className={styles.movieDetails}>
              <img
                className={styles.img}
                src={
                  (movie.poster_path && API.baseImgUrl + movie.poster_path) ||
                  API.placeholder
                }
                alt={movie.title || movie.name}
              />
              <div className={styles.wrapper}>
                <div className={styles.description}>
                  <h2 className={styles.title}>{movie.title || movie.name}</h2>
                  {movie.popularity && (
                    <p className={styles.text}>
                      <span className={styles.accent}>Rating:</span>{" "}
                      {movie.popularity}
                    </p>
                  )}
                  <p className={styles.text}>{movie.overview}</p>
                  <p className={styles.text}>
                    <span className={styles.accent}>Genres:</span>
                    {movie.genres.map((genre) => (
                      <span className={styles.genre} key={genre.id}>
                        {genre.name}
                      </span>
                    ))}
                  </p>

                  <p className={styles.text}>
                    <span className={styles.accent}>Release year:</span>
                    {movie.release_date.split("-")[0]}
                  </p>
                </div>
                <div className={styles.moreInfo}>
                  <h3 className={styles.smallTitle}>Additional information</h3>
                  <ul className={styles.list}>
                    <li className={styles.element}>
                      <NavLink
                        className={styles.link}
                        activeClassName={styles.activeLink}
                        exact
                        to={{
                          pathname: `${this.props.match.url}/cast`,
                          state: { from: checkState(this.props.location) },
                        }}
                      >
                        Cast
                      </NavLink>
                    </li>
                    <li className={styles.element}>
                      <NavLink
                        className={styles.link}
                        activeClassName={styles.activeLink}
                        to={{
                          pathname: `${this.props.match.url}/reviews`,
                          state: { from: checkState(this.props.location) },
                        }}
                      >
                        Reviews
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <Route path={routes.Cast} component={Cast} />
            <Route path={routes.Reviews} component={Reviews} />
          </>
        )}
        {error && <ErrorPage />}
      </>
    );
  }
}
