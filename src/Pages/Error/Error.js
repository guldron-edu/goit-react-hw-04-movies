import React from "react";
import { Link } from "react-router-dom";
import styles from "./Error.module.css";
import routes from "../../routes";

export default function Error(props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        Упс...Такой страницы не существут...попробуйте еще раз
      </p>
      <Link
        className={styles.link}
        to={{
          pathname: `${routes.MoviesPage}`,
        }}
      >
        Вернуться к поиску
      </Link>
    </div>
  );
}
