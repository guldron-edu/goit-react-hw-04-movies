import React, { Component } from "react";
import PropTypes from "prop-types";
import API from "../../API/fetchApi";
import styles from "./Cast.module.css";
import routes from "../../routes";

export default class Cast extends Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
  };

  state = { actors: null };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    API.fetchCredits(movieId)
      .then((response) => this.setState({ actors: response.cast }))
      .catch(() => {
        this.props.history.push(routes.Error);
      });
  }

  render() {
    const { actors } = this.state;

    return (
      <ul className={styles.list}>
        {actors &&
          actors.map((actor) => (
            <li key={actor.id} className={styles.element}>
              <img
                className={styles.img}
                src={
                  (actor.profile_path &&
                    API.baseActorUrl + actor.profile_path) ||
                  API.actorPlaceholder
                }
                alt={actor.name}
              ></img>
              <p className={styles.accent}>{actor.name}</p>
              {actor.character && (
                <p className={styles.text}>Character: {actor.character}</p>
              )}
            </li>
          ))}
      </ul>
    );
  }
}
