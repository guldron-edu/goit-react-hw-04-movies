import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import API from "../../API/fetchApi";
import routes from "../../routes";
import styles from "./Gallery.module.css";

export default class Gallery extends Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    nextPage: PropTypes.func.isRequired,
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        title: PropTypes.string,
        poster_path: PropTypes.string,
      })
    ),
  };
  render() {
    const { movies } = this.props;

    return (
      <>
        <section className={styles.wrapper}>
          <ul className={styles.list}>
            {movies.map((movie) => (
              <li className={styles.item} key={movie.id}>
                <Link
                  className={styles.link}
                  to={{
                    pathname: `${routes.MoviesPage}/${movie.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  <h2 className={styles.title}>{movie.name || movie.title}</h2>
                  <img
                    className={styles.img}
                    src={
                      (movie.poster_path &&
                        API.baseImgUrl + movie.poster_path) ||
                      API.placeholder
                    }
                    alt={movie.name}
                  ></img>
                </Link>
              </li>
            ))}
          </ul>
          <button
            className={styles.btn}
            type="button"
            onClick={this.props.nextPage}
          >
            Show more
          </button>
        </section>
      </>
    );
  }
}
