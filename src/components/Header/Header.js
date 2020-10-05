import React from "react";
import { NavLink } from "react-router-dom";

import routes from "../../routes";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <NavLink
        to={routes.HomePage}
        className={styles.link}
        activeClassName={styles.activeLink}
        exact
      >
        Home
      </NavLink>
      <NavLink
        to={routes.MoviesPage}
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Movies
      </NavLink>
    </header>
  );
}
