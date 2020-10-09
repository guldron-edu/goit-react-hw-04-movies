import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import API from "../../API/fetchApi";
import routes from "../../routes";
import styles from "./GalleryItem.module.css";

function GalleryItem({ singleMovie, location }) {
  return (
    <li className={styles.item}>
      <Link
        className={styles.link}
        to={{
          pathname: `${routes.MoviesPage}/${singleMovie.id}`,
          state: { from: location },
        }}
      >
        <h2 className={styles.title}>
          {singleMovie.name || singleMovie.title}
        </h2>
        <img
          className={styles.img}
          src={
            (singleMovie.poster_path &&
              API.baseImgUrl + singleMovie.poster_path) ||
            API.placeholder
          }
          alt={singleMovie.name}
        ></img>
      </Link>
    </li>
  );
}

GalleryItem.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.object,
  }),
};
export default GalleryItem;
