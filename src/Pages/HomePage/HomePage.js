import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import Gallery from "../../components/Gallery/Gallery";
import API from "../../API/fetchApi";
import routes from "../../routes";
import parseSearch from "../../utils/parseQueryString";
import Loader from "../../components/Loader/Loader";
import scroll from "../../utils/scroll";

export default class HomePage extends Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
  };
  state = {
    popularMovies: [],
    loading: false,
  };

  componentDidMount() {
    API.fetchShowPopular().then((response) =>
      this.setState({ popularMovies: response.results })
    ).catch(() => {
      this.props.history.push(routes.Error);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { search: currentSearch } = this.props.location;
    const { search: prevSearch } = prevProps.location;
    const { page: currentPage } = parseSearch(currentSearch);
    const { page: prevPage } = parseSearch(prevSearch);
    if (currentPage && currentPage !== prevPage) {
      this.fetchMovies(currentPage);
      setTimeout(scroll, 1000);
    }
  }

  fetchMovies = (page) => {
    this.setState({ loading: true });

    API.fetchShowPopular(page)
      .then((response) =>
        this.setState((prevState) => {
          return {
            popularMovies: [...prevState.popularMovies, ...response.results],
          };
        })
      )
      .catch(() => {
        this.props.history.push(routes.Error);
      })
      .finally(() => this.setState({ loading: false }));
  };

  nextPopularPage = () => {
    const { search } = this.props.location;

    if (!search) {
      this.props.history.push({
        ...this.props.location,
        search: `page=2`,
      });
    } else {
      let { page } = parseSearch(search);
      page = Number(page) + 1;
      this.props.history.push({
        ...this.props.location,
        search: `page=${page}`,
      });
    }
  };

  render() {
    const { popularMovies, loading } = this.state;
    return (
      <>
        <Route
          path={routes.HomePage}
          render={(props) => (
            <Gallery
              {...props}
              movies={popularMovies}
              nextPage={this.nextPopularPage}
            />
          )}
        />
        {loading && <Loader />}
      </>
    );
  }
}
