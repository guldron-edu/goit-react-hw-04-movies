import React from "react";
import PropTypes from "prop-types";
import styles from "./Gallery.module.css";
import GalleryItem from "../GalleryItem/GalleryItem";

function Gallery({ movies, nextPage, location }) {
  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        {movies.map((movie) => (
          <GalleryItem key={movie.id} singleMovie={movie} location={location} />
        ))}
      </ul>
      <button className={styles.btn} type="button" onClick={nextPage}>
        Show more
      </button>
    </section>
  );
}

Gallery.propTypes = {
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
export default Gallery;
