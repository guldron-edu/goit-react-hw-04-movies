let Api = {
  key: "4d6d28cb5a6010575aef258a298f9e3f",

  baseImgUrl: "https://image.tmdb.org/t/p/w400",

  baseActorUrl: "https://image.tmdb.org/t/p/w200",

  placeholder: "http://placehold.it/500x750",
  actorPlaceholder: "http://placehold.it/200x300",

  fetchShowPopular(page = 1) {
    return fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.key}&page=${page}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success === false) {
          throw new Error("Network Error");
        }
        return response;
      });
  },
  fetchByQuery(query, page) {
    return fetch(`
  https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=en-US&query=${query}&page=${page}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.success === false) {
          throw new Error("Network Error");
        }
        return response;
      });
  },
  fetchById(id) {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.key}&language=en-US`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success === false) {
          throw new Error("Network Error");
        }
        return response;
      });
  },
  fetchCredits(id) {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.key}&language=en-US`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success === false) {
          throw new Error("Network Error");
        }
        return response;
      });
  },
  fetchReviews(id) {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${this.key}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success === false) {
          throw new Error("Network Error");
        }
        return response;
      });
  },
};

export default Api;
