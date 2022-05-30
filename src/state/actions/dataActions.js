import { ADD_FAVORITE_FILM, SEARCH_MOVIE, REMOVE_MOVIE_FROM_FAVORITE_LIST, REGISTER_FAVORITES, GET_LIST_INTO_STATE, GET_MOVIE_INFO_INTO_STATE } from '../action-types/index';

export function searchMoveis(movies) {
  return {
    type: SEARCH_MOVIE,
    payload: {
      movies: movies,
    },
  };
}

export function fetchMovies(name) {
  return function (dispatch) {
    const api = "1cf8eb23";
    fetch(`http://www.omdbapi.com/?s=${name}&apikey=${api}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(searchMoveis(data.Search));
      });
  };
}

export function addFavoriteList(id) {
  return {
    type: ADD_FAVORITE_FILM,
    payload: {
      id: id,
    },
  };
}

export function removeMovieFromFavoriteList(id) {
  return {
    type: REMOVE_MOVIE_FROM_FAVORITE_LIST,
    payload: {
      id: id,
    },
  };
}

export function registerFavoriteList(listID) {
  return {
    type: REGISTER_FAVORITES,
    payload: {
      listID: listID,
    },
  };
}

export function postList(title, favoritesIDArray) {
  return function (dispatch) {
    let savedList = {
      title: title,
      movies: favoritesIDArray,
    };
    fetch(`https://acb-api.algoritmika.org/api/movies/list/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(savedList),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(registerFavoriteList(data.id));
      });
  };
}

export function getListIntoState(title, movies) {
  return {
    type: GET_LIST_INTO_STATE,
    payload: {
      title: title,
      listMovies: movies,
    },
  };
}

export function getList(id) {
  return function (dispatch) {
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getListIntoState(data.title, data.movies));
        dispatch(getMovieInfoByImdbID(data.movies));
      });
  };
}
export function getMovieInfoToState(movieDetails) {
  return {
    type: GET_MOVIE_INFO_INTO_STATE,
    payload: {
      movieDetails: movieDetails,
    },
  };
}
export function getMovieInfoByImdbID(movies) {
  return function (dispatch) {
    let movieDetailsArray = [];
    movies.forEach((e) => {
      fetch(`http://www.omdbapi.com/?i=${e}&apikey=bfa19603`)
        .then((res) => res.json())
        .then((data) => {
          movieDetailsArray = [...movieDetailsArray, { ...data }];
          dispatch(getMovieInfoToState(movieDetailsArray));
        });
    });
  };
}
