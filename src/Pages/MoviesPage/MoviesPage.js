import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import Gallery from "../../components/Gallery/Gallery";
import Loader from "../../components/Loader/Loader";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import API from "../../API/fetchApi";
import routes from "../../routes";
import InputForm from "../../components/inputForm/inputForm";
import parseSearch from "../../utils/parseQueryString";
import styles from "./MoviesPage.module.css";
import scroll from "../../utils/scroll";

export default class MoviePage extends Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
  };
  state = { foundMovies: [], loading: false };

  componentDidMount() {
    const { search } = this.props.location;
    const { query, page } = parseSearch(search);

    if (query) {
      this.fetchMovies(query, page);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { search: currentSearch } = this.props.location;
    const { search: prevSearch } = prevProps.location;
    const { query: currentQuery } = parseSearch(currentSearch);
    const { query: prevQuery } = parseSearch(prevSearch);
    const { page: currentPage } = parseSearch(currentSearch);
    const { page: prevPage } = parseSearch(prevSearch);

    if (!currentSearch && currentSearch !== prevSearch) {
      this.clearPage();
    }
    if (currentQuery && currentQuery.length > 0 && currentQuery !== prevQuery) {
      this.clearPage();
      this.fetchMovies(currentQuery);
    }

    if (currentPage && currentPage !== prevPage && currentPage > 1) {
      setTimeout(scroll, 1000);
    }
  }

  addSearchQuery = (e) => {
    let searchQuery = e.target[0].value;
    e.preventDefault();
    if (searchQuery) {
      this.props.history.push({
        ...this.props.location,
        search: `query=${searchQuery}&page=1`,
      });
    }
  };

  fetchMovies = (query, page) => {
    this.setState({ loading: true });

    API.fetchByQuery(query, page)
      .then((response) =>
        this.setState((prevState) => {
          return {
            foundMovies: [...prevState.foundMovies, ...response.results],
          };
        })
      )
      .catch(() => {
        this.props.history.push(routes.Error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  nextPage = () => {
    const { search } = this.props.location;
    const { query } = parseSearch(search);
    let { page } = parseSearch(search);
    page = Number(page) + 1;

    this.fetchMovies(query, page);

    this.props.history.push({
      ...this.props.location,
      search: `query=${query}&page=${page}`,
    });
  };

  clearPage = () => {
    this.setState({ foundMovies: [] });
  };

  render() {
    const { foundMovies, loading } = this.state;
    return (
      <>
        <div className={styles.wrapper}>
          <InputForm submit={this.addSearchQuery} />
          {foundMovies.length > 0 && (
            <Route
              path={routes.HomePage}
              render={(props) => (
                <Gallery
                  {...props}
                  movies={foundMovies}
                  nextPage={this.nextPage}
                />
              )}
            />
          )}
          {loading && <Loader />}
        </div>
      </>
    );
  }
}
