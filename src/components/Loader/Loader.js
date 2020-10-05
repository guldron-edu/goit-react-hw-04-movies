import React, { Component } from "react";
import Loader from "react-loader-spinner";
import styles from "./Loader.module.css";

export default class Spinner extends Component {
  render() {
    return (
      <Loader
        className={styles.loader}
        type="Circles"
        color="#00BFFF"
        height={80}
        width={80}
      />
    );
  }
}
