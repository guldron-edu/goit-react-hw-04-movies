import React from "react";
import styles from "./Error.module.css";
import routes from "../../routes";

const goBack = (history) => {
  history.push(routes.MoviesPage);
};

export default function Error(props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        Упс...Такой страницы не существут...попробуйте еще раз
      </p>

      <button
        type="button"
        className={styles.btn}
        onClick={() => goBack(props.history)}
      >
        Вернуться к поиску
      </button>
    </div>
  );
}
