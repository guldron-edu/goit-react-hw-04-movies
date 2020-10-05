import React, { Component } from "react";
import PropTypes from "prop-types";
import API from "../../API/fetchApi";
import styles from "./Reviews.module.css";
import routes from "../../routes";

export default class Reviews extends Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
  };

  state = { reviews: null };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    API.fetchReviews(movieId)
      .then((response) => this.setState({ reviews: response.results }))
      .catch(() => {
        this.props.history.push(routes.Error);
      });
  }

  existingReviews = () => {
    return this.state.reviews.length > 0;
  };

  render() {
    const { reviews } = this.state;

    return reviews && this.existingReviews() ? (
      <div className={styles.wrapper}>
        {reviews.map((review) => (
          <p className={styles.text} key={review.id}>
            {review.content}
          </p>
        ))}
      </div>
    ) : (
      <p className={styles.text}>We don't have any reviews for this movie.</p>
    );
  }
}
